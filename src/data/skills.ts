export type SkillCategory =
  | "AI & Machine Learning"
  | "Full Stack Development"
  | "UI/UX"
  | "Motion Design"
  | "Backend Systems"
  | "Cloud & DevOps";

export type Skill = {
  name: string;
  category: SkillCategory;
  level: number; // 0-100
};

export const skillCategories: SkillCategory[] = [
  "AI & Machine Learning",
  "Full Stack Development",
  "UI/UX",
  "Motion Design",
  "Backend Systems",
  "Cloud & DevOps",
];

export const skills: Skill[] = [
  { name: "Python / Flask", category: "AI & Machine Learning", level: 88 },
  { name: "HuggingFace", category: "AI & Machine Learning", level: 82 },
  { name: "NLP / Transformers", category: "AI & Machine Learning", level: 80 },
  { name: "React / Next.js", category: "Full Stack Development", level: 92 },
  { name: "TypeScript", category: "Full Stack Development", level: 90 },
  { name: "NestJS / Node.js", category: "Full Stack Development", level: 88 },
  { name: "React Native / Expo", category: "Full Stack Development", level: 85 },
  { name: "Tailwind CSS", category: "UI/UX", level: 90 },
  { name: "Design Systems", category: "UI/UX", level: 82 },
  { name: "Accessibility", category: "UI/UX", level: 78 },
  { name: "GSAP / Framer Motion", category: "Motion Design", level: 86 },
  { name: "Three.js / R3F", category: "Motion Design", level: 84 },
  { name: "PostgreSQL / MySQL", category: "Backend Systems", level: 88 },
  { name: "Prisma / TypeORM", category: "Backend Systems", level: 86 },
  { name: "REST / OpenAPI", category: "Backend Systems", level: 90 },
  { name: "Docker", category: "Cloud & DevOps", level: 84 },
  { name: "Redis", category: "Cloud & DevOps", level: 78 },
  { name: "CI / Deployment", category: "Cloud & DevOps", level: 76 },
];
