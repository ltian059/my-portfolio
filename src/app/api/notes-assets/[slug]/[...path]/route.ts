import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { resolveNotesDir } from "@/lib/notes/assets";

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

const NOTES_DIR = resolveNotesDir();

// Guard against path traversal when resolving assets.
function isSafePath(baseDir: string, targetPath: string) {
  // Ensure the target path stays within the base directory.
  const relative = path.relative(baseDir, targetPath);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

// Decode URL-encoded segments without throwing on malformed input.
function decodePathSegment(value: string) {
  // Decode URL-encoded segments while keeping malformed values safe.
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function resolveAssetPath(slug: string, assetPath: string[]) {
  // Prefer per-note folders (content/<slug>/...) for assets.
  const noteDir = path.join(NOTES_DIR, slug);
  if (assetPath.length === 0) return null;
  const folderAsset = path.join(noteDir, ...assetPath);
  if (isSafePath(noteDir, folderAsset) && fs.existsSync(folderAsset)) {
    return folderAsset;
  }

  return null;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug, path: assetPath } = await params;
  const decodedSlug = decodePathSegment(slug);
  const decodedPath = assetPath.map(decodePathSegment);
  const resolvedPath = resolveAssetPath(decodedSlug, decodedPath);
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
