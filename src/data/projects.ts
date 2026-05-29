export type ProjectCategory =
  | "AI Projects"
  | "SaaS Platforms"
  | "Web Applications"
  | "Mobile Apps"
  | "Experimental Creative Coding";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  description: string;
  highlights: string[];
  stack: string[];
  github?: string;
  live?: string;
  accent: string;
};

export const projectCategories: ProjectCategory[] = [
  "AI Projects",
  "SaaS Platforms",
  "Web Applications",
  "Mobile Apps",
  "Experimental Creative Coding",
];

export const projects: Project[] = [
  {
    id: "ai-summarizer",
    title: "AI Text Summarizer",
    category: "AI Projects",
    year: "2025-2026",
    description:
      "Graduation project (Distinction): intelligent summarization with semantic ranking and accessible HCI.",
    highlights: [
      "HuggingFace abstractive summarization",
      "SentenceTransformers semantic ranking",
      "Flask REST API with validation",
    ],
    stack: ["Python", "Flask", "Transformers", "Streamlit"],
    github: "https://github.com/29SalahMo",
    live: "https://web-automated-summarizer-for-articles-l4xh9rgfctv8doirksivxn.streamlit.app/",
    accent: "from-violet-500/40 via-cyan-400/30 to-blue-500/20",
  },
  {
    id: "cafes-system",
    title: "Egyptian Restaurant Management",
    category: "SaaS Platforms",
    year: "2024-2025",
    description:
      "Production-grade multi-role platform: POS, KDS, admin, and customer interfaces with real-time kitchen flow.",
    highlights: [
      "RBAC + JWT (Passport)",
      "Socket.IO real-time orders",
      "Docker Compose deployment",
    ],
    stack: ["NestJS", "Next.js", "TypeORM", "Socket.IO", "Docker"],
    github: "https://github.com/29SalahMo",
    live: "https://crop-wink-07777579.figma.site/",
    accent: "from-purple-600/40 via-fuchsia-500/25 to-cyan-400/20",
  },
  {
    id: "cybrd",
    title: "CYBRD Streetwear Storefront",
    category: "Web Applications",
    year: "2024-2025",
    description:
      "Immersive cyberpunk e-commerce with 3D UI, Stripe checkout, Prisma backend, and documented APIs.",
    highlights: [
      "React Three Fiber 3D UI",
      "Stripe payments",
      "Swagger API docs",
    ],
    stack: ["React", "Vite", "Express", "Prisma", "Stripe", "R3F"],
    github: "https://github.com/29SalahMo",
    live: "https://cybrd-streetwear.vercel.app/",
    accent: "from-cyan-400/35 via-blue-500/25 to-pink-500/20",
  },
  {
    id: "cfo",
    title: "CFO Financial Services",
    category: "Web Applications",
    year: "2024",
    description:
      "Bilingual Arabic/English financial portfolio with lead capture via SMTP and WhatsApp Cloud API.",
    highlights: [
      "i18n + RTL support",
      "Zod-validated API routes",
      "Rate-limited contact flows",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Nodemailer"],
    github: "https://github.com/29SalahMo",
    live: "https://cfo-financial-website.vercel.app/",
    accent: "from-blue-500/30 via-indigo-500/25 to-violet-500/20",
  },
  {
    id: "esms",
    title: "Egypt Supermarket System",
    category: "SaaS Platforms",
    year: "2024",
    description:
      "Inventory, POS, suppliers, and reporting with Egyptian locale and Arabic UI.",
    highlights: [
      "PostgreSQL + Redis",
      "RBAC + JWT",
      "Docker Compose stack",
    ],
    stack: ["React", "Express", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/29SalahMo",
    live: "https://market-software.vercel.app/",
    accent: "from-emerald-400/25 via-cyan-400/25 to-blue-500/20",
  },
  {
    id: "backend-pro",
    title: "Interactive 3D English Learning",
    category: "Mobile Apps",
    year: "2024",
    description:
      "Interactive 3D English learning experience with engaging UI and educational quiz flows.",
    highlights: [
      "3D interactive learning UI",
      "Quiz and progress flows",
      "Deployed on Vercel",
    ],
    stack: ["React", "Three.js", "TypeScript", "Vite"],
    github: "https://github.com/29SalahMo",
    live: "https://english-flow-3d-learn.vercel.app/",
    accent: "from-pink-500/30 via-purple-500/25 to-cyan-400/20",
  },
  {
    id: "portfolio-3d",
    title: "Interactive English Learning Quiz",
    category: "Experimental Creative Coding",
    year: "2024",
    description:
      "Educational quiz platform with face recognition, gesture control, and teacher dashboard concepts.",
    highlights: [
      "Face recognition login",
      "Gesture-based answers",
      "Child-friendly interactive UI",
    ],
    stack: ["Python", "OpenCV", "Flask", "JavaScript"],
    github: "https://github.com/29SalahMo/Interactive-learnig",
    live: "https://interactive-learnig.vercel.app/",
    accent: "from-violet-600/35 via-cyan-400/30 to-pink-400/20",
  },
];
