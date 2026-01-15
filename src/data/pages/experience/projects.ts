export type ExperienceProject = {
  name: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: string;
};

const projectItems: ExperienceProject[] = [
  {
    name: "Financial Pulse - High-Availability News Platform",
    period: "May 2025 - Aug 2025",
    summary:
      "Owned end-to-end delivery of a secure, high-availability news platform built on AWS.",
    highlights: [
      "Scaled backend infrastructure (EC2, S3, Aurora) to support 500K users and 10M+ posts.",
      "Built an event-driven backend with SQS and Lambda for high-throughput async processing.",
      "Designed and secured RESTful APIs with API Gateway and Spring Security (OAuth2/JWT).",
      "Automated CI/CD with GitHub Actions and managed IaC via CloudFormation.",
    ],
    stack: [
      "AWS",
      "Java",
      "Spring Boot",
      "SQS",
      "Lambda",
      "API Gateway",
      "CloudFormation",
    ],
    link: "https://github.com/ltian059/financial-pulse"
  },
  {
    name: "Embedded Wearable & Radar-Based Physiological Monitoring System",
    period: "Sep 2024 - Jan 2025",
    summary:
      "Capstone project on real-time physiological signal acquisition and human activity recognition.",
    highlights: [
      "Collected synchronized PPG and accelerometer data at 250 Hz on MAXREFDES104.",
      "Built a binary parsing tool for near real-time streaming and CSV conversion.",
      "Optimized Go Direct Respiration Belt stack for USB and BLE data acquisition.",
      "Deployed a mmWave activity recognition system on Jetson Orin NX.",
    ],
    stack: ["MATLAB", "Python", "Embedded Systems", "Jetson Orin"],
  },
  {
    name: "High-Availability E-commerce Platform",
    period: "Dec 2022 - May 2023",
    summary:
      "A microservices-based e-commerce system focused on scalability and fault isolation.",
    highlights: [
      "Built 10+ Spring Cloud services with clear domain separation and horizontal scaling.",
      "Used RabbitMQ and Redisson distributed locks to reduce flash-sale latency from ~2s to ~200ms.",
      "Integrated Elasticsearch to improve product search and ranking performance.",
      "Containerized services with Docker for consistent local and staging environments.",
    ],
    stack: ["Java", "Spring Cloud", "RabbitMQ", "Redis", "Elasticsearch", "Docker"],
    link: "https://github.com/ltian059/E-commerse-Website-Undergraduate-Project-"
  },
];

export const projectsSection = {
  id: "projects",
  title: "Projects",
  subtitle: "Deeper dives into selected builds.",
  linkLabel: "View project",
  items: projectItems,
};
