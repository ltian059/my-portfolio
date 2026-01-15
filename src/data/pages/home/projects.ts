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
    name: "Financial Pulse (AWS)",
    detail:
      "Social-style financial tracking platform with Spring Boot microservices and REST APIs.",
    tag: "AWS Microservices",
    hint: "EC2, RDS, DynamoDB, SQS, Lambda, Spring Boot",
  },
  {
    name: "High-Availability E-commerce Platform",
    detail:
      "10+ Spring Cloud services with RabbitMQ, Redis, and Elasticsearch for search and flash sales.",
    tag: "High Concurrency",
    hint: "RabbitMQ, Redisson, Redis, Elasticsearch, Docker",
  },
  {
    name: "CI/CD Automation",
    detail:
      "Automated build, test, and deploy pipelines using GitHub Actions and CloudFormation.",
    tag: "DevOps",
    hint: "GitHub Actions, CloudFormation, AWS",
  },
];
