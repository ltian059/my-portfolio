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
      logoSrc: "/experience/logo-invision.svg",
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
    {
      company: "Example Systems Lab",
      role: "Research Assistant",
      period: "Sep 2023 - May 2024",
      location: "City, Country",
      logoSrc: "/experience/logo-example-systems-lab.svg",
      logoAlt: "Example Systems Lab logo",
      summary:
        "Worked on observability pipelines for distributed services and log analysis tooling.",
      highlights: [
        "Designed a metrics ingestion pipeline for high-volume service telemetry.",
        "Built dashboards for latency and error tracking to support debugging.",
      ],
      stack: ["Python", "Kafka", "Grafana"],
    },
  ],
};
