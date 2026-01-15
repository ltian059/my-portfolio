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
      location: "Toronto, ON, Canada - Remote",
      logoSrc: "/experience/Invision_Inc.png",
      logoAlt: "Invision logo",
      summary:
        "Backend engineer for Financial Pulse, a social-style financial tracking platform on AWS.",
      highlights: [
        "Implemented Spring Boot microservices and RESTful APIs for post publishing, following, and personalized feeds.",
        "Designed request/response DTOs and PostgreSQL schemas for account and content services.",
        "Added SQS + Lambda async processing for notifications and analytics, cutting write API latency ~40% in staging tests.",
        "Helped build CI/CD with GitHub Actions and AWS CloudFormation for dev, staging, and prod.",
        "Secured APIs with Spring Security (JWT) and documented endpoints via Swagger/OpenAPI.",
      ],
      stack: [
        "Java",
        "Spring Boot",
        "AWS",
        "PostgreSQL",
        "DynamoDB",
        "SQS",
        "Lambda",
        "GitHub Actions",
      ],
    },
  ],
};
