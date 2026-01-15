export type WorkItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  logoSrc: string;
  logoAlt: string;
  summary: string;
  highlights: string[];
  stack?: string[];
};

export const workSection = {
  id: "work",
  title: "Work Experience",
  subtitle: "Industry roles and impact.",
  items: [
    {
      company: "Invision Inc.",
      role: "Software Development Engineer Intern",
      period: "May 2025 - Aug 2025",
      location: "Remote",
      logoSrc: "/experience/Invision_Inc.png",
      logoAlt: "Invision logo",
      summary:
        "Backend engineer for Financial Pulse, a social-style financial tracking platform on AWS.",
      highlights: [
        "Built Spring Boot microservices and REST APIs for posts, follows, and feeds.",
        "Added an SQS + Lambda pipeline to offload write operations and reduce latency.",
        "Secured APIs with JWT and documented endpoints via OpenAPI.",
      ],
      stack: ["Java", "Spring Boot", "AWS", "PostgreSQL"],
    },
  ],
};
