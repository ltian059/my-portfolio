import { hero } from "./hero";
import { stats } from "./stats";
import { resumeHighlights, resumeSection } from "./resume";
import { techSection, techStack, focusNote } from "./tech";
import { featuredProjects, projectsSection } from "./projects";
import { notesSection } from "./notes";

export { hero };
export { stats };
export { resumeHighlights, resumeSection };
export { techSection, techStack, focusNote };
export { featuredProjects, projectsSection };
export { notesSection };

// Aggregate type for the /api/home payload.
export type HomeData = {
  hero: typeof hero;
  stats: typeof stats;
  resumeSection: typeof resumeSection;
  resumeHighlights: typeof resumeHighlights;
  techSection: typeof techSection;
  techStack: typeof techStack;
  focusNote: typeof focusNote;
  projectsSection: typeof projectsSection;
  featuredProjects: typeof featuredProjects;
  notesSection: typeof notesSection;
};
