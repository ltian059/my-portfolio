// Type for the stats summary cards on the home page.
export type StatItem = {
  label: string;
  value: string;
};

export const stats: StatItem[] = [
  { label: "Experience", value: "0 - 1 years" },
  { label: "Projects Delivered", value: "3+ projects" },
  { label: "Focus", value: "Backend & Architecture" },
];
