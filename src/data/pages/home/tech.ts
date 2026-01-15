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
    items: [
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "REST APIs",
      "JWT/Spring Security",
      "Swagger/OpenAPI",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (EC2, RDS, DynamoDB, Lambda, SQS)",
      "CloudFormation",
      "Docker",
      "Linux",
      "GitHub Actions (CI/CD)",
    ],
  },
  {
    label: "Data & Search",
    items: ["PostgreSQL", "MySQL", "Redis", "Elasticsearch"],
  },
];

export const focusNote =
  "Current focus: backend architecture, system design, service governance, and observability.";
