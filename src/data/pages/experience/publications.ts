export type PublicationItem = {
  title: string;
  venue: string;
  year: string;
  authors: string;
  details: string;
  highlights?: string[];
  link?: string;
  note?: string;
};

export const publicationsSection = {
  id: "publications",
  title: "Publications",
  subtitle: "Selected papers and preprints.",
  linkLabel: "View publication",
  detailsLabel: "Abstract",
  items: [
    {
      title: "Adaptive Caching for Microservices at Scale",
      venue: "ACM Systems Workshop",
      year: "2024",
      authors: "Your Name, Collaborator Name",
      details:
        "We present an adaptive cache placement strategy that improves tail latency for multi-tenant microservices under bursty workloads.",
      highlights: [
        "Introduced a feedback-driven cache allocator with per-service SLO tracking.",
        "Evaluated on production-like traces to show improved P95 latency.",
      ],
      link: "https://example.com/publications/adaptive-caching",
      note: "Under review",
    },
  ],
};
