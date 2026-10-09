export type SkillCategory =
  | "IT Support & Hardware"
  | "Operating Systems & Networking"
  | "Cybersecurity Fundamentals"
  | "Data Analysis & Reporting"
  | "AI Tools & Productivity"
  | "Programming & Full-Stack Development";

export type Skill = {
  name: string;
  category: SkillCategory;
  verifiedIn: "Workplace" | "Academic" | "Projects" | "Certification";
};

export const skillCategories: SkillCategory[] = [
  "IT Support & Hardware",
  "Operating Systems & Networking",
  "Cybersecurity Fundamentals",
  "Data Analysis & Reporting",
  "AI Tools & Productivity",
  "Programming & Full-Stack Development",
];

export const skills: Skill[] = [
  // IT Support & Hardware
  { name: "Workstation Setup & Relocation", category: "IT Support & Hardware", verifiedIn: "Workplace" },
  { name: "Hardware & Peripheral Support", category: "IT Support & Hardware", verifiedIn: "Workplace" },
  { name: "Cabling & Connectivity", category: "IT Support & Hardware", verifiedIn: "Workplace" },
  { name: "Helpdesk SLA & Support", category: "IT Support & Hardware", verifiedIn: "Workplace" },
  { name: "Microsoft Office 365 Support", category: "IT Support & Hardware", verifiedIn: "Workplace" },
  { name: "Remote Technical Support", category: "IT Support & Hardware", verifiedIn: "Workplace" },

  // Operating Systems & Networking
  { name: "Windows 10 / 11", category: "Operating Systems & Networking", verifiedIn: "Workplace" },
  { name: "Linux / Kali Environment", category: "Operating Systems & Networking", verifiedIn: "Academic" },
  { name: "TCP/IP & LAN/WAN", category: "Operating Systems & Networking", verifiedIn: "Academic" },
  { name: "DNS & DHCP Basics", category: "Operating Systems & Networking", verifiedIn: "Academic" },

  // Cybersecurity Fundamentals
  { name: "Malware Incident Response", category: "Cybersecurity Fundamentals", verifiedIn: "Workplace" },
  { name: "Threat Identification & Isolation", category: "Cybersecurity Fundamentals", verifiedIn: "Workplace" },
  { name: "Security Awareness & Recovery", category: "Cybersecurity Fundamentals", verifiedIn: "Workplace" },
  { name: "Role-Based Access Control (RBAC)", category: "Cybersecurity Fundamentals", verifiedIn: "Projects" },
  { name: "HCIA-Security Fundamentals", category: "Cybersecurity Fundamentals", verifiedIn: "Certification" },

  // Data Analysis & Reporting
  { name: "Data Analysis & Interpretation", category: "Data Analysis & Reporting", verifiedIn: "Workplace" },
  { name: "Statistical Summary Reports", category: "Data Analysis & Reporting", verifiedIn: "Workplace" },
  { name: "Engineering Surveys", category: "Data Analysis & Reporting", verifiedIn: "Workplace" },
  { name: "Evidence-Based Decision Support", category: "Data Analysis & Reporting", verifiedIn: "Workplace" },

  // AI Tools & Productivity
  { name: "Structured Prompt Engineering", category: "AI Tools & Productivity", verifiedIn: "Workplace" },
  { name: "AI Workflow Acceleration", category: "AI Tools & Productivity", verifiedIn: "Workplace" },
  { name: "HuggingFace Transformers", category: "AI Tools & Productivity", verifiedIn: "Academic" },
  { name: "SentenceTransformers (NLP)", category: "AI Tools & Productivity", verifiedIn: "Academic" },
  { name: "Streamlit Prototyping", category: "AI Tools & Productivity", verifiedIn: "Projects" },

  // Programming & Full-Stack Development
  { name: "TypeScript & JavaScript", category: "Programming & Full-Stack Development", verifiedIn: "Projects" },
  { name: "Next.js & React", category: "Programming & Full-Stack Development", verifiedIn: "Projects" },
  { name: "Node.js & Express", category: "Programming & Full-Stack Development", verifiedIn: "Projects" },
  { name: "NestJS & REST APIs", category: "Programming & Full-Stack Development", verifiedIn: "Projects" },
  { name: "Python & Flask", category: "Programming & Full-Stack Development", verifiedIn: "Academic" },
  { name: "PostgreSQL, MySQL & SQLite", category: "Programming & Full-Stack Development", verifiedIn: "Projects" },
  { name: "Docker & Container Deployment", category: "Programming & Full-Stack Development", verifiedIn: "Projects" },
  { name: "Tailwind CSS & Framer Motion", category: "Programming & Full-Stack Development", verifiedIn: "Projects" },
];

