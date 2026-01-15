export type ExperienceProject = {
  name: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: string;
};

export const projectsSection = {
  id: "projects",
  title: "Projects",
  subtitle: "Deeper dives into selected builds.",
  linkLabel: "View project",
  items: [
    {
      name: "High-Availability E-commerce Platform",
      period: "Dec 2022 - May 2023",
      summary:
        "A microservices-based e-commerce system focused on scalability and fault isolation.",
      highlights: [
        "Implemented 10+ Spring Cloud services with Docker-based deployment.",
        "Used RabbitMQ and Redisson locks to reduce flash-sale order latency.",
        "Integrated Elasticsearch to improve search and ranking performance.",
      ],
      stack: ["Java", "Spring Cloud", "RabbitMQ", "Elasticsearch"],
    },
    {
      name: "Personal Portfolio",
      period: "2024 - Present",
      summary:
        "A data-driven portfolio site with MDX notes, dynamic TOC, and custom navigation.",
      highlights: [
        "Built a reusable layout with a side drawer and scroll-synced navigation.",
        "Added MDX rendering with math, code highlighting, and note assets routing.",
      ],
      stack: ["TypeScript", "Next.js", "MDX"],
      link: "https://example.com",
    },
  ],
};
