import { link } from "fs";

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
      title:
        "Phenotype Matching: RF Sensor-Based Indoor Subject Identification with Wearable Sensor Assistance",
      venue: "Int Conf IEEE Eng Med Biol Soc. 2025 Jul",
      year: "2025",
      authors: "Zixiong Han, Li(Daniel) Tian, co-authors",
      details:
        "As part of my M.Sc. capstone project (CSI6900), I contributed to an RF-based indoor subject identification system that fuses contactless RF sensing with wearable physiological data. The system targets privacy-preserving indoor identification by combining RF signatures with ground-truth physiological phenotypes from wearables. My work focused on data collection, signal processing, and model development for subject identification without per-subject customization.",
      highlights: [
        "Implemented data acquisition and preprocessing pipelines for PPG, accelerometer, and respiration signals.",
        "Performed signal processing and feature extraction to align wearable and RF sensing outputs.",
        "Assisted with model evaluation across multiple subjects and indoor scenarios.",
        "Contributed to result analysis and interpretation for the final paper.",
      ],
      note: "Guided by Prof. Miodrag Bolic · IEEE EMBS 2025",
      link: "https://pubmed.ncbi.nlm.nih.gov/41337307/"
    },
  ],
};
