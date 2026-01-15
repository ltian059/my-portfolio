/**
 * @file Reader for MDX notes stored under src/data/pages/notes/content.
 * These helpers run on the server to read files and parse frontmatter.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const NOTES_DIR = (() => {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "src", "data", "pages", "notes", "content"),
    path.join(cwd, "data", "pages", "notes", "content"),
  ];

  // Prefer the first existing path so the reader works even if dev runs from /src.
  const found = candidates.find((dir) => fs.existsSync(dir));
  return found ?? candidates[0];
})();

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

export function getAllNotes(): NoteMeta[] {
  // Scan the directory for .mdx files and parse frontmatter.
  const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith(".mdx"));
  const notes = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const fullPath = path.join(NOTES_DIR, file);
    const { data } = readMdxFile(fullPath);
    return parseMeta(slug, data);
  });

  // Sort by priority (smaller is higher priority), then by date desc.
  return notes.sort((a, b) => {
    const ap = a.priority ?? Number.MAX_SAFE_INTEGER;
    const bp = b.priority ?? Number.MAX_SAFE_INTEGER;
    if (ap !== bp) return ap - bp;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getNoteBySlug(slug: string): NoteContent | null {
  const fullPath = path.join(NOTES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = readMdxFile(fullPath);
  return {
    meta: parseMeta(slug, data),
    body: content,
  };
}
