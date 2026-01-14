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


const noteItems: SideNavItem[] = notes.
  sort((a, b) => { 
    const ap = a.priority ?? -1;
    const bp = b.priority ?? -1;
    if (ap !== bp) return ap - bp;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
   })
  .map((note) => ({
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
