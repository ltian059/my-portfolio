import { NextResponse } from "next/server";
import { getAllNotes } from "@/lib/notes/reader";

export function GET() {
  const notes = getAllNotes();
  return NextResponse.json({ notes });
}
