import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

type RouteContext = {
  params: Promise<{
    slug: string;
    path: string[];
  }>;
};

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const NOTES_DIR = path.join(
  process.cwd(),
  "src",
  "data",
  "pages",
  "notes",
  "content"
);

function isSafePath(baseDir: string, targetPath: string) {
  // Ensure the target path stays within the base directory.
  const normalizedBase = path.resolve(baseDir);
  const normalizedTarget = path.resolve(targetPath);
  return normalizedTarget.startsWith(normalizedBase);
}

function resolveAssetPath(slug: string, assetPath: string[]) {
  // Prefer per-note folders (content/<slug>/...) for assets.
  const noteDir = path.join(NOTES_DIR, slug);
  const folderAsset = path.join(noteDir, ...assetPath);
  if (isSafePath(noteDir, folderAsset) && fs.existsSync(folderAsset)) {
    return folderAsset;
  }

  // Fallback: support legacy flat notes (content/<slug>.mdx) with shared assets.
  const flatNote = path.join(NOTES_DIR, `${slug}.mdx`);
  if (fs.existsSync(flatNote)) {
    const rootAsset = path.join(NOTES_DIR, ...assetPath);
    if (isSafePath(NOTES_DIR, rootAsset) && fs.existsSync(rootAsset)) {
      return rootAsset;
    }
  }

  return null;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug, path: assetPath } = await params;
  const resolvedPath = resolveAssetPath(slug, assetPath);
  if (!resolvedPath) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const ext = path.extname(resolvedPath).toLowerCase();
  const contentType = MIME_BY_EXT[ext] ?? "application/octet-stream";
  // Read as a raw buffer to avoid accidental UTF-8 decoding for binaries.
  const file = fs.readFileSync(resolvedPath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
