import { NextResponse } from "next/server";
import type { SideNavItem } from "@/components/side-nav";
import {
  hero,
  resumeSection,
  techSection,
  projectsSection,
  notesSection,
} from "@/data/home";
import { getAllNotes } from "@/data/notes/reader";

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

export function GET() {
  return NextResponse.json({ sideNavByPath });
}
