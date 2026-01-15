export type PublicationItem = {
  title: string;
  venue: string;
  year: string;
  authors: string;
  link?: string;
  note?: string;
};

export const publicationsSection = {
  id: "publications",
  title: "Publications",
  subtitle: "Selected papers and preprints.",
  linkLabel: "View publication",
  items: [
    {
      title: "Adaptive Caching for Microservices at Scale",
      venue: "ACM Systems Workshop",
      year: "2024",
      authors: "Your Name, Collaborator Name",
      link: "https://example.com/publications/adaptive-caching",
      note: "Under review",
    },
  ],
};
