import fs from "node:fs";
import path from "node:path";

const NOTES_DIR_CANDIDATES = [
  path.join(process.cwd(), "src", "data", "pages", "notes", "content"),
  path.join(process.cwd(), "data", "pages", "notes", "content"),
];

function isAbsoluteAssetUrl(value: string) {
  return value.startsWith("/") || value.includes(":");
}

// Resolve the filesystem root for notes content.
export function resolveNotesDir() {
  // Pick the first existing notes directory so local/dev layouts both work.
  return NOTES_DIR_CANDIDATES.find((dir) => fs.existsSync(dir))
    ?? NOTES_DIR_CANDIDATES[0];
}

// Convert a note-local asset path to a public URL.
export function resolveNoteAssetUrl(slug: string, assetPath?: string) {
  // Map a note-local asset path to the public notes-assets API URL.
  if (!assetPath) return undefined;
  if (isAbsoluteAssetUrl(assetPath)) return assetPath;
  const normalized = assetPath.replace(/^\.\/+/, "");
  const encodedSlug = encodeURIComponent(slug);
  const encodedPath = normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/api/notes-assets/${encodedSlug}/${encodedPath}`;
}
