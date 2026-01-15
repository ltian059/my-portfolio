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
      school: "Example University",
      degree: "M.S. in Computer Science",
      period: "2023 - 2025",
      location: "City, Country",
      logoSrc: "/experience/uOttawa-logo.svg",
      logoAlt: "Example University crest",
      highlights: [
        "Focus on distributed systems, cloud computing, and applied machine learning.",
        "Coursework: Advanced Algorithms, Database Systems, and Cloud Infrastructure.",
      ],
    },
    {
      school: "Example Institute of Technology",
      degree: "B.S. in Software Engineering",
      period: "2019 - 2023",
      location: "City, Country",
      logoSrc: "/experience/HUnan_Normal_University.svg",
      logoAlt: "Example Institute of Technology crest",
      highlights: [
        "Built a strong foundation in systems design, data structures, and web development.",
        "Led a capstone project on high-availability service architecture.",
      ],
    },
  ],
};
