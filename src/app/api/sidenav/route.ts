import { NextResponse } from "next/server";
import type { SideNavItem } from "@/components/side-nav";
import {
  hero,
  resumeSection,
  techSection,
  projectsSection,
  notesSection,
} from "@/data/home";
import { getAllNotes, getNoteBySlug } from "@/lib/notes/reader";
import { generateToc } from "@/lib/notes/toc";

export type SideNavConfig = {
  title?: string;
  items: SideNavItem[];
};

const homeItems: SideNavItem[] = [
  hero,
  resumeSection,
  techSection,
  projectsSection,
  notesSection,
].map((section) => ({
  label: section.title,
  href: `#${section.id}`,
}));

const noteItems: SideNavItem[] = getAllNotes().map((note) => ({
  label: note.title,
  href: `#${note.slug}`,
}));

export function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");
  const sideNavByPath: Record<string, SideNavConfig> = {
    "/": {
      title: "Home",
      items: homeItems,
    },
    "/notes": {
      title: "Notes",
      items: noteItems,
    },
    "/experience": {
      title: "Experience",
      items: [{ label: "Highlights", href: "#experience" }],
    },
  };

  if (path && path.startsWith("/notes/") && path !== "/notes/") {
    const slug = path.split("/").pop() ?? "";
    const note = getNoteBySlug(slug);
    if (note) {
      const toc = generateToc(note.body);
      sideNavByPath[path] = {
        title: note.meta.title,
        items: toc.map((item) => ({
          label: item.text,
          href: `#${item.id}`,
        })),
      };
    }
  }

  return NextResponse.json({ sideNavByPath });
}
