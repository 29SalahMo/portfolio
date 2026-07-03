export type TimelineEvent = {
  year: string;
  title: string;
  org: string;
  description: string;
};

export const timeline: TimelineEvent[] = [
  {
    year: "2025-2026",
    title: "AI Text Summarizer - Graduation Project",
    org: "MSA University",
    description:
      "Distinction project: HuggingFace summarization, semantic ranking, Flask API, HCI-focused bilingual UI.",
  },
  {
    year: "2026",
    title: "AI Search & ML Classifier",
    org: "Independent",
    description:
      "Streamlit app with Uniform Cost Search, Greedy Search, and Decision Tree classification on the Iris dataset.",
  },
  {
    year: "2025-2026",
    title: "A&A Legal Advisors Website",
    org: "Independent",
    description:
      "Cinematic law firm site with GSAP scroll, R3F accents, practice-area showcases, and Supabase-backed flows.",
  },
  {
    year: "2026",
    title: "Universal Translator (Desktop)",
    org: "Independent",
    description:
      "Tkinter translator with RTL Arabic UI, deep-translator integration, and PyInstaller Windows packaging.",
  },
  {
    year: "2026",
    title: "Eldinamo Gaming Link Hub",
    org: "Independent",
    description:
      "Premium creator link hub with electric blue storm branding, multi-platform social links, and Streamlabs donations.",
  },
  {
    year: "2025",
    title: "Movra Luxury Store",
    org: "Independent",
    description:
      "Luxury perfume and cosmetics e-commerce with cart, checkout, auth flows, and collection-based shopping experience.",
  },
  {
    year: "2024-2025",
    title: "Restaurant Management Platform",
    org: "Independent",
    description:
      "Multi-role POS/KDS system with NestJS, JWT, Socket.IO, Next.js, and Docker Compose.",
  },
  {
    year: "2024",
    title: "E-commerce and Financial Products",
    org: "Independent",
    description:
      "3D cyberpunk storefront (Stripe, Prisma) and bilingual CFO services site (i18n, WhatsApp API).",
  },
  {
    year: "2024",
    title: "Mobile and Nutrition APIs",
    org: "Independent",
    description:
      "Expo learning app with gamification; NutriCare REST API with JWT, rate limiting, and MySQL.",
  },
  {
    year: "2023",
    title: "Foundations and Charity System",
    org: "Academic",
    description:
      "Full-stack PHP/MySQL charity platform with SRS documentation and reporting modules.",
  },
  {
    year: "2024",
    title: "HCIA-Security Training",
    org: "Huawei / ICT Talent Bank",
    description: "45-hour security fundamentals alongside software engineering practice.",
  },
];
