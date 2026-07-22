export const profile = {
  name: "Yonas",
  role: "AI Engineer & Software Builder",
  location: "Addis Ababa, Ethiopia",
  email: "yonasayeletola62@gmail.com",
  intro: "I build intelligent systems from first principles—and ship them into the real world.",
  support:
    "From symbolic AI and machine learning to full-stack products and production infrastructure, I turn complex reasoning into useful, deployable software.",
  mission:
    "Build intelligent software that automates real-world problems and creates meaningful impact.",
  brandLine: "Reason clearly. Build deeply. Ship usefully.",
} as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/japuyon",
    short: "github / japuyon",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yonas-ayele-9b9123288/",
    short: "linkedin / yonas",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/japu_yonas/",
    short: "leetcode / japu_yonas",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/japu",
    short: "codeforces / japu",
  },
  {
    label: "HackerRank",
    href: "https://www.hackerrank.com/profile/yonasayeletola62",
    short: "hackerrank / yonas",
  },
] as const;

export const codingProfile = {
  platform: "LeetCode",
  username: "japu_yonas",
  href: "https://leetcode.com/u/japu_yonas/",
  capturedAt: "21 Jul 2026",
  totalSolved: 420,
  totalAvailable: 3999,
  rank: "279,676",
  badges: 3,
  latestBadge: "50 Days Badge 2025",
  difficulty: [
    { label: "Easy", solved: 187, available: 956, tone: "mint" },
    { label: "Medium", solved: 205, available: 2088, tone: "amber" },
    { label: "Hard", solved: 28, available: 955, tone: "coral" },
  ],
} as const;

export const experience = [
  {
    organization: "Nexora Technology PLC",
    role: "Co-founder & Deputy Manager",
    marker: "Build / lead",
    detail:
      "Building and shipping software systems while working across product delivery, deployment, and operational problem-solving.",
  },
  {
    organization: "iCog Labs",
    role: "Software Programmer, Trainer & Technical Evaluator",
    marker: "Build / teach",
    detail:
      "Programming, designing technical training, mentoring interns, and evaluating mathematical and symbolic-reasoning ability.",
  },
  {
    organization: "A2SV",
    role: "Generation 6 Alumnus",
    marker: "Algorithms",
    detail:
      "An algorithmic foundation shaped by data structures, problem-solving discipline, and continuous technical evaluation.",
  },
  {
    organization: "Computer Science",
    role: "B.Sc. · Year III",
    marker: "Education",
    detail:
      "Formal computer science study alongside production engineering, AI research, and from-scratch implementation work.",
  },
] as const;

export const capabilityClusters = [
  {
    index: "01",
    title: "Reasoning systems",
    signal: "Represent → connect → infer",
    description:
      "Symbolic AI, knowledge representation, pattern mining, hypergraphs, and the OpenCog Hyperon ecosystem.",
    tools: ["Hyperon", "MeTTa", "PeTTa", "Pattern mining", "Rust"],
  },
  {
    index: "02",
    title: "Learning systems",
    signal: "Model → evaluate → improve",
    description:
      "Classical machine learning, mathematical foundations, PyTorch, graph neural networks, and model evaluation.",
    tools: ["Python", "PyTorch", "NumPy", "Pandas", "Scikit-learn"],
  },
  {
    index: "03",
    title: "Product systems",
    signal: "Shape → build → iterate",
    description:
      "End-to-end software products with clear interfaces, modular architecture, and real operational constraints.",
    tools: ["React", "Vite", "Node.js", "PostgreSQL", "Supabase"],
  },
  {
    index: "04",
    title: "Shipping systems",
    signal: "Package → deploy → observe",
    description:
      "Production delivery across containers, VPS environments, hosting control planes, and web-server configuration.",
    tools: ["Docker", "Linux", "VPS", "LiteSpeed", "Shell"],
  },
] as const;

export const learning = {
  completed: [
    "Linear regression",
    "Regularization",
    "Decision trees",
    "Random forests",
    "Boosting",
    "Feature engineering",
    "Model evaluation",
  ],
  current: [
    "Deep learning",
    "Transformers",
    "AI agents",
    "RAG systems",
    "LangGraph",
    "MCP",
    "Distributed AI",
  ],
} as const;
