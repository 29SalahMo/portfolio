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
  level: "Expert" | "Advanced" | "Proficient";
  proficiency: number; // 1 to 5
  description: string;
};

export const skillCategoryMeta: Record<
  SkillCategory,
  { label: string; icon: string; accent: string; description: string }
> = {
  "IT Support & Hardware": {
    label: "IT Support & Hardware",
    icon: "🖥️",
    accent: "from-cyan-500/20 to-blue-500/20 border-cyan-400/30 text-cyan-300",
    description: "Enterprise workstations, peripheral configuration, SLA management, and branch support.",
  },
  "Operating Systems & Networking": {
    label: "Operating Systems & Networking",
    icon: "🌐",
    accent: "from-blue-500/20 to-indigo-500/20 border-blue-400/30 text-blue-300",
    description: "Windows 10/11 enterprise rollouts, Linux/Kali distributions, TCP/IP, and LAN topologies.",
  },
  "Cybersecurity Fundamentals": {
    label: "Cybersecurity Fundamentals",
    icon: "🛡️",
    accent: "from-violet-500/20 to-purple-500/20 border-violet-400/30 text-violet-300",
    description: "Malware incident isolation, threat recovery, access control, and HCIA-Security.",
  },
  "Data Analysis & Reporting": {
    label: "Data Analysis & Reporting",
    icon: "📊",
    accent: "from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-300",
    description: "Statistical interpretation, engineering survey summaries, and business intelligence.",
  },
  "AI Tools & Productivity": {
    label: "AI Tools & Productivity",
    icon: "🤖",
    accent: "from-rose-500/20 to-pink-500/20 border-rose-400/30 text-rose-300",
    description: "Structured prompt workflows, HuggingFace transformers, NLP semantic search, and Streamlit.",
  },
  "Programming & Full-Stack Development": {
    label: "Full-Stack Development",
    icon: "⚡",
    accent: "from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-300",
    description: "Modern TypeScript, Next.js, React, Node.js, NestJS, Python Flask, and SQL databases.",
  },
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
  {
    name: "Workstation Setup & Relocation",
    category: "IT Support & Hardware",
    verifiedIn: "Workplace",
    level: "Expert",
    proficiency: 5,
    description: "Multi-branch workstation setups, peripheral cabling, monitor arms, and hardware staging.",
  },
  {
    name: "Hardware & Peripheral Support",
    category: "IT Support & Hardware",
    verifiedIn: "Workplace",
    level: "Expert",
    proficiency: 5,
    description: "Troubleshooting printers, scanners, docking stations, RAM/SSD upgrades, and motherboard diagnostics.",
  },
  {
    name: "Cabling & Physical Connectivity",
    category: "IT Support & Hardware",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "RJ-45 termination, patch panel patching, cable management, and switch port assignments.",
  },
  {
    name: "Helpdesk SLA & Support Operations",
    category: "IT Support & Hardware",
    verifiedIn: "Workplace",
    level: "Expert",
    proficiency: 5,
    description: "Strict ticket SLA tracking, issue triage, remote troubleshooting, and user onboarding.",
  },
  {
    name: "Microsoft 365 Administration",
    category: "IT Support & Hardware",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "User provisioning, mailbox licensing, Teams & SharePoint permissions, and Outlook desktop sync.",
  },
  {
    name: "Remote Technical Support",
    category: "IT Support & Hardware",
    verifiedIn: "Workplace",
    level: "Expert",
    proficiency: 5,
    description: "AnyDesk, TeamViewer, RDP diagnostics, and multi-branch remote resolution.",
  },

  // Operating Systems & Networking
  {
    name: "Windows 10 / 11 Enterprise",
    category: "Operating Systems & Networking",
    verifiedIn: "Workplace",
    level: "Expert",
    proficiency: 5,
    description: "OS deployment, registry repairs, Group Policy client troubleshooting, and driver isolation.",
  },
  {
    name: "Linux / Kali Environment",
    category: "Operating Systems & Networking",
    verifiedIn: "Academic",
    level: "Advanced",
    proficiency: 4,
    description: "Bash scripting, systemd service management, package repos, and terminal auditing.",
  },
  {
    name: "TCP/IP & LAN/WAN Topologies",
    category: "Operating Systems & Networking",
    verifiedIn: "Academic",
    level: "Advanced",
    proficiency: 4,
    description: "Subnetting, packet routing, gateway config, and Wireshark traffic inspection.",
  },
  {
    name: "DNS & DHCP Infrastructure",
    category: "Operating Systems & Networking",
    verifiedIn: "Academic",
    level: "Advanced",
    proficiency: 4,
    description: "Dynamic host assignment, lease reservations, DNS records, and resolution diagnosis.",
  },

  // Cybersecurity Fundamentals
  {
    name: "Malware Incident Response",
    category: "Cybersecurity Fundamentals",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "Infected workstation isolation, malware scrubbing, registry cleanup, and safe data recovery.",
  },
  {
    name: "Threat Identification & Isolation",
    category: "Cybersecurity Fundamentals",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "Suspicious process detection, rootkit checks, network socket auditing, and remediation.",
  },
  {
    name: "Security Awareness & Policy Enforcement",
    category: "Cybersecurity Fundamentals",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "Staff credential hygiene, phishing deterrence, and safe external media policies.",
  },
  {
    name: "Role-Based Access Control (RBAC)",
    category: "Cybersecurity Fundamentals",
    verifiedIn: "Projects",
    level: "Advanced",
    proficiency: 4,
    description: "Principle of least privilege, token authentication, and role authorization policies.",
  },
  {
    name: "HCIA-Security Fundamentals",
    category: "Cybersecurity Fundamentals",
    verifiedIn: "Certification",
    level: "Proficient",
    proficiency: 3,
    description: "Firewall rule sets, VPN encryption architectures, and baseline cybersecurity defense.",
  },

  // Data Analysis & Reporting
  {
    name: "Data Analysis & Interpretation",
    category: "Data Analysis & Reporting",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "Cleaning operational datasets, correlation analysis, and trend discovery.",
  },
  {
    name: "Statistical Summary Reports",
    category: "Data Analysis & Reporting",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "Executive-ready summaries, distribution charts, and variance calculations.",
  },
  {
    name: "Engineering Surveys & Metrics",
    category: "Data Analysis & Reporting",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "Field data aggregation, construction progress metrics, and technical verification.",
  },
  {
    name: "Evidence-Based Decision Support",
    category: "Data Analysis & Reporting",
    verifiedIn: "Workplace",
    level: "Advanced",
    proficiency: 4,
    description: "Translating raw operational numbers into actionable management recommendations.",
  },

  // AI Tools & Productivity
  {
    name: "Structured Prompt Engineering",
    category: "AI Tools & Productivity",
    verifiedIn: "Workplace",
    level: "Expert",
    proficiency: 5,
    description: "Chain-of-thought system prompts, Few-shot prompting, and automated workflow pipelines.",
  },
  {
    name: "AI Workflow Acceleration",
    category: "AI Tools & Productivity",
    verifiedIn: "Workplace",
    level: "Expert",
    proficiency: 5,
    description: "Using LLMs for code refactoring, incident summarization, and accelerated research.",
  },
  {
    name: "HuggingFace Transformers",
    category: "AI Tools & Productivity",
    verifiedIn: "Academic",
    level: "Advanced",
    proficiency: 4,
    description: "Fine-tuning encoder models, tokenization pipelines, and NLP classification tasks.",
  },
  {
    name: "SentenceTransformers (NLP)",
    category: "AI Tools & Productivity",
    verifiedIn: "Academic",
    level: "Advanced",
    proficiency: 4,
    description: "Dense vector embeddings, cosine semantic similarity, and document retrieval.",
  },
  {
    name: "Streamlit AI Prototyping",
    category: "AI Tools & Productivity",
    verifiedIn: "Projects",
    level: "Advanced",
    proficiency: 4,
    description: "Rapid interactive interfaces for AI model testing, data visualizations, and client demos.",
  },

  // Programming & Full-Stack Development
  {
    name: "TypeScript & JavaScript (ESNext)",
    category: "Programming & Full-Stack Development",
    verifiedIn: "Projects",
    level: "Expert",
    proficiency: 5,
    description: "Strict type safety, modern async patterns, functional utilities, and component architectures.",
  },
  {
    name: "Next.js 15+ & React 19",
    category: "Programming & Full-Stack Development",
    verifiedIn: "Projects",
    level: "Expert",
    proficiency: 5,
    description: "App Router, Server Actions, streaming SSR, dynamic imports, and route handlers.",
  },
  {
    name: "Node.js & Express Architecture",
    category: "Programming & Full-Stack Development",
    verifiedIn: "Projects",
    level: "Expert",
    proficiency: 5,
    description: "RESTful microservices, middleware chains, token security, and async event queues.",
  },
  {
    name: "NestJS Enterprise Framework",
    category: "Programming & Full-Stack Development",
    verifiedIn: "Projects",
    level: "Advanced",
    proficiency: 4,
    description: "Modular controllers, dependency injection, DTO validation, and Swagger documentation.",
  },
  {
    name: "Python 3 & Flask APIs",
    category: "Programming & Full-Stack Development",
    verifiedIn: "Academic",
    level: "Advanced",
    proficiency: 4,
    description: "Backend REST endpoints, scientific computations, OpenCV pipelines, and data handling.",
  },
  {
    name: "PostgreSQL, MySQL & SQLite",
    category: "Programming & Full-Stack Development",
    verifiedIn: "Projects",
    level: "Advanced",
    proficiency: 4,
    description: "Relational schema design, indexed queries, migrations with Prisma/TypeORM, and ACID reliability.",
  },
  {
    name: "Docker & Container Deployment",
    category: "Programming & Full-Stack Development",
    verifiedIn: "Projects",
    level: "Advanced",
    proficiency: 4,
    description: "Multi-stage Dockerfiles, Docker Compose service stacks, and cloud container hosting.",
  },
  {
    name: "Tailwind CSS & Framer Motion",
    category: "Programming & Full-Stack Development",
    verifiedIn: "Projects",
    level: "Expert",
    proficiency: 5,
    description: "Fluid responsive UI, hardware-composited transitions, glassmorphism, and dark mode systems.",
  },
];

