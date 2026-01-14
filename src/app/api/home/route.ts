import { NextResponse } from "next/server";
import {
  featuredProjects,
  focusNote,
  hero,
  notesSection,
  projectsSection,
  resumeHighlights,
  resumeSection,
  stats,
  techSection,
  techStack,
} from "@/data/home";

export function GET() {
  return NextResponse.json({
    hero,
    stats,
    resumeSection,
    resumeHighlights,
    techSection,
    techStack,
    focusNote,
    projectsSection,
    featuredProjects,
    notesSection,
  });
}
