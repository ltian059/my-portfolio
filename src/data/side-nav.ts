import type { SideNavItem } from "../components/side-nav";
import { notes } from "../data/notes";
import { hero, resumeSection, techSection, projectsSection, notesSection} from "./home"

export type SideNavConfig = {
  title?: string;
  items: SideNavItem[];
};

const homeProps = [hero, resumeSection, techSection, projectsSection, notesSection];
const homeItems: SideNavItem[] = homeProps.map((section) => ({
  label: section.title,
  href: `#${section.id}`,
}));


const noteItems: SideNavItem[] = notes.map((note) => ({
  label: note.title,
  href: `#${note.slug}`,
}));

export const sideNavByPath: Record<string, SideNavConfig> = {
  "/": {
    title: "Home Sections",
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
