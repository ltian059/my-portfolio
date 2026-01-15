export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  location: string;
  logoSrc: string;
  logoAlt: string;
  highlights: string[];
};

export const educationSection = {
  id: "education",
  title: "Education",
  subtitle: "Academic background and focus areas.",
  items: [
    {
      school: "University of Ottawa",
      degree: "M.Sc. in Computer Science",
      period: "Sep 2023 - Mar 2025",
      location: "Ottawa, Canada",
      logoSrc: "/experience/uOttawa-logo.svg",
      logoAlt: "University of Ottawa crest",
      highlights: [
        "Focus on distributed systems, cloud computing, and applied machine learning.",
        "Capstone work on wearable and radar-based physiological monitoring.",
        "Grade: A.",
      ],
    },
    {
      school: "Hunan Normal University",
      degree: "B.Eng. in Computer Science",
      period: "Sep 2019 - Jun 2023",
      location: "Changsha, China",
      logoSrc: "/experience/Hunan_Normal_University.svg",
      logoAlt: "Hunan Normal University crest",
      highlights: [
        "Strong foundation in systems design, data structures, and backend development.",
        "Coursework in programming languages, algorithms, and database systems.",
        "Grade: 88.05/100.",
      ],
    },
  ],
};
