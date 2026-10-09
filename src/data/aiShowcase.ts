export type ProblemSolvingPrinciple = {
  step: string;
  title: string;
  description: string;
  iconName: string;
};

export type FeaturedAIProject = {
  id: string;
  title: string;
  badge: string;
  description: string;
  methodology: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const problemSolvingPrinciples: ProblemSolvingPrinciple[] = [
  {
    step: "01",
    title: "Modular Breakdown",
    description: "Deconstructing complex technical & business challenges into small, independently testable sub-tasks.",
    iconName: "Boxes",
  },
  {
    step: "02",
    title: "Tool Selection",
    description: "Choosing technologies based on constraints (e.g., Python/Flask for NLP, Next.js for web speed, SQLite for lightweight data).",
    iconName: "Wrench",
  },
  {
    step: "03",
    title: "AI Acceleration + Verification",
    description: "Leveraging AI for rapid research and drafting while validating every result through technical testing.",
    iconName: "ShieldCheck",
  },
  {
    step: "04",
    title: "Evidence-Based Decisions",
    description: "Comparing trade-offs using real operational data and performance benchmarks before committing to solutions.",
    iconName: "TrendingUp",
  },
];

export const featuredAIProjects: FeaturedAIProject[] = [
  {
    id: "ai-summarizer",
    title: "AI Text Summarizer",
    badge: "Graduation Project - Distinction",
    description: "Integrated HuggingFace abstractive summarization models with SentenceTransformers for semantic similarity ranking and an accessible bilingual interface.",
    methodology: "Combined NLP Transformer models with a Flask REST API and evaluated summaries using ROUGE metrics and human readability tests.",
    stack: ["Python", "Flask", "HuggingFace", "SentenceTransformers", "Streamlit"],
    liveUrl: "https://web-automated-summarizer-for-articles-l4xh9rgfctv8doirksivxn.streamlit.app/",
    githubUrl: "https://github.com/29SalahMo",
  },
  {
    id: "ai-search-ml",
    title: "AI Graph Search & ML Classifier",
    badge: "Interactive Algorithmic Demo",
    description: "Interactive application demonstrating pathfinding algorithms (Uniform Cost Search, Greedy Search) alongside a Decision Tree classifier trained on the Iris dataset.",
    methodology: "Implemented step-by-step state expansion visualization and decision boundary evaluation for algorithmic clarity.",
    stack: ["Python", "Streamlit", "scikit-learn", "NumPy"],
    liveUrl: "https://ai-project-89gdtrendkugvwmkxn9tsd.streamlit.app/",
    githubUrl: "https://github.com/29SalahMo/ai-project",
  },
  {
    id: "gym-buddy-engine",
    title: "Gym Buddy Recommendation Engine",
    badge: "Full-Stack Logic Engine",
    description: "Fitness web app combining SQLite authentication with an algorithmic BMI & goal-based diet/workout generation engine.",
    methodology: "Mapped user biometric data to rule-based caloric and macro calculations for tailored workout recommendations.",
    stack: ["Node.js", "Express", "SQLite", "JavaScript", "HTML5/CSS3"],
    liveUrl: "https://gym-nu-rouge.vercel.app/",
    githubUrl: "https://github.com/29SalahMo/Gym",
  },
  {
    id: "universal-translator",
    title: "Universal Desktop Translator",
    badge: "Desktop Automation",
    description: "Desktop utility with automatic RTL alignment for Arabic, keyboard shortcuts, and single-file Windows executable generation.",
    methodology: "Wrapped deep-translator with error-handling fallbacks and built native Windows executables via PyInstaller.",
    stack: ["Python", "Tkinter", "deep-translator", "PyInstaller"],
    liveUrl: "https://29salahmo.github.io/Translator-app/",
    githubUrl: "https://github.com/29SalahMo/Translator-app",
  },
];
