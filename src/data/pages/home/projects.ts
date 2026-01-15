export const projectsSection = {
  id: "projects",
  title: "Featured Projects",
  subtitle: "Top 3 representative Projects",
};

// Type for each featured project card.
export type FeaturedProject = {
  name: string;
  detail: string;
  tag: string;
  hint: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "Business Platform",
    detail: "Unified order, user, and risk modules supporting 5 business lines.",
    tag: "System Design",
    hint: "Add: key tech points, scale, measurable impact1",
  },
  {
    name: "Real-time Risk Pipeline",
    detail: "Sub-second rule evaluation with metrics alerts to reduce losses.",
    tag: "High Concurrency",
    hint: "Add: key tech points, scale, measurable impact2",
  },
  {
    name: "Campaign Platform",
    detail: "Configurable pages and automation for fast iteration.",
    tag: "Platform",
    hint: "Add: key tech points, scale, measurable impact3",
  },
];
