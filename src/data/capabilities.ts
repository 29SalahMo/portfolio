export type Capability = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tools: string[];
  category: "Workplace Experience" | "Engineering & AI" | "Software Development";
  iconName: string;
};

export const capabilities: Capability[] = [
  {
    id: "it-support-infra",
    title: "IT Support & Infrastructure",
    shortDescription: "Hardware setup, peripheral configuration, workstation deployment, and SLA technical helpdesk.",
    fullDescription: "Providing end-to-end technical support across engineering and administrative workstations. Configuring computers, monitors, peripherals, cabling, and maintaining strict SLA response for daily operational continuity.",
    tools: ["Workstations", "Peripherals", "Cabling", "SLA Helpdesk", "Remote Support"],
    category: "Workplace Experience",
    iconName: "Server",
  },
  {
    id: "multi-branch-ops",
    title: "Multi-Branch IT Operations",
    shortDescription: "Cross-site IT coordination across two corporate branches to guarantee business continuity.",
    fullDescription: "Managing IT operations across two active company branches. Relocating, upgrading, and configuring hardware assets while keeping team members connected and operational.",
    tools: ["Branch Infrastructure", "Hardware Relocation", "Network Connectivity", "Employee Onboarding"],
    category: "Workplace Experience",
    iconName: "Globe",
  },
  {
    id: "cybersecurity-awareness",
    title: "Cybersecurity & Malware Support",
    shortDescription: "Rapid identification and recovery handling for malware threats and risk prioritization.",
    fullDescription: "Handling malware-related incidents through rapid threat isolation, structured risk evaluation, and responsible recovery within designated permissions. Supported by HCIA-Security training.",
    tools: ["Malware Response", "Threat Isolation", "Incident Handling", "HCIA-Security", "RBAC"],
    category: "Workplace Experience",
    iconName: "ShieldAlert",
  },
  {
    id: "data-analysis-surveys",
    title: "Data Analysis & Statistical Surveys",
    shortDescription: "Structuring survey data, statistical reporting, and evidence-based decision guidance.",
    fullDescription: "Transforming raw information into clear statistical summaries, internal management reports, and engineering survey evaluations to back key business decisions with empirical data.",
    tools: ["Data Analysis", "Statistical Reporting", "Engineering Surveys", "Excel", "Reporting"],
    category: "Workplace Experience",
    iconName: "BarChart3",
  },
  {
    id: "ai-assisted-productivity",
    title: "AI-Enhanced Productivity",
    shortDescription: "Applying structured prompt engineering and iterative AI verification to accelerate technical workflows.",
    fullDescription: "Accelerating research, document processing, code analysis, and reporting using structured AI prompts paired with rigorous manual verification to ensure high accuracy and responsible automation.",
    tools: ["Prompt Engineering", "LLM Acceleration", "Iterative Verification", "Workflow Automation"],
    category: "Engineering & AI",
    iconName: "Sparkles",
  },
  {
    id: "strategic-problem-solving",
    title: "Strategic & Analytical Problem-Solving",
    shortDescription: "Deconstructing complex technical problems into testable modules with trade-off evaluation.",
    fullDescription: "Approaching outages, system bugs, and business requirements by breaking them into smaller testable hypotheses, comparing potential trade-offs, and selecting evidence-based solutions.",
    tools: ["Modular Decomposition", "Root-Cause Analysis", "Trade-Off Matrix", "Logic Trees"],
    category: "Engineering & AI",
    iconName: "BrainCircuit",
  },
  {
    id: "full-stack-dev",
    title: "Full-Stack Software Development",
    shortDescription: "Designing and building modern web apps, APIs, microservices, and databases.",
    fullDescription: "Architecting web platforms from database schemas (PostgreSQL, MySQL, SQLite) to server logic (Node.js, Express, NestJS, Flask) and high-performance frontends (Next.js, React, Tailwind CSS).",
    tools: ["Next.js", "React", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "Docker"],
    category: "Software Development",
    iconName: "Code2",
  },
  {
    id: "programming-algorithms",
    title: "Programming & Algorithmic Design",
    shortDescription: "Implementation of graph search algorithms, ML classifiers, and clean object-oriented code.",
    fullDescription: "Applying computer science fundamentals including Uniform Cost Search, Greedy Search, Decision Trees, and NLP summarization transformers to produce reliable software products.",
    tools: ["Python", "HuggingFace", "scikit-learn", "Streamlit", "Algorithms"],
    category: "Software Development",
    iconName: "Cpu",
  },
];
