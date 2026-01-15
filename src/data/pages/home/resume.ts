export const resumeSection = {
  id: "resume",
  title: "Resume Highlights",
  linkLabel: "Full experience →",
  linkHref: "/experience",
};

// Type for each resume highlight card.
export type ResumeHighlight = {
  role: string;
  period: string;
  summary: string;
  bullets: string[];
};

export const resumeHighlights: ResumeHighlight[] = [
  {
    role: "Software Development Engineer Intern · Invision Inc.",
    period: "May 2025 — Aug 2025",
    summary:
      "Backend engineer for Financial Pulse, a social-style financial tracking platform on AWS.",
    bullets: [
      "Built Spring Boot microservices and REST APIs for posts, follows, and personalized feeds.",
      "Added SQS + Lambda async processing, cutting write API response time ~40% in staging tests.",
      "Secured APIs with Spring Security (JWT) and documented endpoints via Swagger/OpenAPI.",
    ],
  },
  {
    role: "High-Availability E-commerce Platform · Academic Project",
    period: "Dec 2022 — May 2023",
    summary:
      "Microservices-based e-commerce system focused on scalability and fault isolation.",
    bullets: [
      "Implemented 10+ Spring Cloud services with Docker-based deployment.",
      "Used RabbitMQ + Redisson locks to reduce flash-sale order latency from ~2s to ~200ms.",
      "Integrated Elasticsearch to improve search and ranking performance.",
    ],
  },
];
