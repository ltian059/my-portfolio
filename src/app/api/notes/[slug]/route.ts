import { NextResponse } from "next/server";
import { getNoteBySlug } from "@/lib/notes/reader";
import { generateToc } from "@/lib/notes/toc";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const normalizedSlug = decodedSlug.replace(/\.mdx$/, "");
  const note = getNoteBySlug(normalizedSlug);
  console.log("[notes slug]", { slug, normalizedSlug });

  if (!note) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const toc = generateToc(note.body);

  return NextResponse.json({
    note: {
      meta: note.meta,
      body: note.body,
    },
    toc,
  });
}
