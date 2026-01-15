/**
 * @file Reader for MDX notes stored under src/data/pages/notes/content.
 * These helpers run on the server to read files and parse frontmatter.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { resolveNotesDir } from "./assets";

const NOTES_DIR = resolveNotesDir();

const NOTE_INDEX = "index.mdx";

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  priority?: number;
  coverImage?: string;
};

export type NoteContent = {
  meta: NoteMeta;
  body: string;
};

function readMdxFile(filePath: string) {
  // Read file as UTF-8 string for frontmatter parsing and MDX rendering.
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function assertString(value: unknown, field: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid or missing frontmatter field: ${field}`);
  }
}

function assertStringArray(value: unknown, field: string) {
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string")) {
    throw new Error(`Invalid or missing frontmatter field: ${field}`);
  }
}

function parseMeta(slug: string, data: Record<string, unknown>): NoteMeta {
  // Validate required fields to avoid silent runtime bugs.
  assertString(data.title, "title");
  assertString(data.date, "date");
  assertStringArray(data.tags, "tags");
  assertString(data.summary, "summary");

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: data.tags as string[],
    summary: data.summary as string,
    priority: typeof data.priority === "number" ? data.priority : undefined,
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
  };
}

function resolveNoteFolderMdxPath(folderName: string) {
  // Prefer index.mdx, then <slug>.mdx, then a single .mdx file if present.
  const indexPath = path.join(NOTES_DIR, folderName, NOTE_INDEX);
  if (fs.existsSync(indexPath)) return indexPath;

  const namedPath = path.join(NOTES_DIR, folderName, `${folderName}.mdx`);
  if (fs.existsSync(namedPath)) return namedPath;

  const files = fs
    .readdirSync(path.join(NOTES_DIR, folderName))
    .filter((entry) => entry.endsWith(".mdx"));
  if (files.length === 1) {
    return path.join(NOTES_DIR, folderName, files[0]);
  }

  return null;
}

function resolveNoteMdxPath(slug: string) {
  // Resolve to a per-note folder MDX file only; flat notes are unsupported.
  return resolveNoteFolderMdxPath(slug);
}

export function getAllNotes(): NoteMeta[] {
  // Scan per-note folders only.
  const entries = fs.readdirSync(NOTES_DIR, { withFileTypes: true });
  const slugMap = new Map<string, NoteMeta>();

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const fullPath = resolveNoteFolderMdxPath(entry.name);
    if (!fullPath) continue;
    const { data } = readMdxFile(fullPath);
    slugMap.set(entry.name, parseMeta(entry.name, data));
  }

  const notes = Array.from(slugMap.values());

  // Sort by priority (smaller is higher priority), then by date desc.
  return notes.sort((a, b) => {
    const ap = a.priority ?? Number.MAX_SAFE_INTEGER;
    const bp = b.priority ?? Number.MAX_SAFE_INTEGER;
    if (ap !== bp) return ap - bp;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getNoteBySlug(slug: string): NoteContent | null {
  const fullPath = resolveNoteMdxPath(slug);
  if (!fullPath || !fs.existsSync(fullPath)) return null;

  const { data, content } = readMdxFile(fullPath);
  return {
    meta: parseMeta(slug, data),
    body: content,
  };
}
