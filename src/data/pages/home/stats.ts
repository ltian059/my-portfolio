// Type for the stats summary cards on the home page.
export type StatItem = {
  label: string;
  value: string;
};

export const stats: StatItem[] = [
  { label: "Degree", value: "M.Sc. Computer Science" },
  { label: "Microservices", value: "10+ services" },
  { label: "Focus", value: "Backend & Cloud" },
];
