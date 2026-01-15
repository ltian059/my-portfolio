export const techSection = {
  id: "tech",
  title: "Tech Stack & Focus",
  subtitle: "Business delivery first, continuously improving full-stack skills.",
};

// Type for each tech stack group.
export type TechStackGroup = {
  label: string;
  items: string[];
};

export const techStack: TechStackGroup[] = [
  {
    label: "Backend",
    items: ["Java", "Spring Boot", "MySQL", "Redis", "Kafka"],
  },
  {
    label: "Infra",
    items: ["Docker", "Kubernetes", "Nginx", "Linux"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "TypeScript", "React"],
  },
];

export const focusNote =
  "Current focus: service governance, domain modeling, observability, frontend engineering.";
