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
} from "@/data/pages/home";

export function GET() {
  try {
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
  } catch (error) {
    // Return JSON errors so callers don't attempt to parse HTML.
    return NextResponse.json(
      { message: "Failed to build home payload." },
      { status: 500 }
    );
  }
}
