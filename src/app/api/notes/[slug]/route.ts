import { NextResponse } from "next/server";
import { getNoteBySlug } from "@/lib/notes/reader";
import { generateToc } from "@/lib/notes/toc";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const normalizedSlug = decodedSlug.replace(/\.mdx$/, "");
    const note = getNoteBySlug(normalizedSlug);

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
  } catch (error) {
    // Surface server-side parsing errors for easier debugging.
    console.error("[notes slug] failed to build note payload", error);
    return NextResponse.json(
      { message: "Failed to build note payload." },
      { status: 500 }
    );
  }
}
