export type ProjectStatus = "shipped" | "in-progress" | "research";
export type ProjectVisual = "infrastructure" | "pattern" | "learning";

export interface Project {
  index: string;
  slug: string;
  title: string;
  eyebrow: string;
  status: ProjectStatus;
  statusLabel: string;
  summary: string;
  statement: string;
  visual: ProjectVisual;
  accent: "blue" | "amber" | "violet" | "mint";
  disciplines: string[];
  facts: string[];
  context: string;
  system: string;
  decisions: Array<{ title: string; detail: string }>;
  proof: string[];
  reflection: string;
}

export const projects: Project[] = [
  {
    index: "01",
    slug: "nexora-ims",
    title: "Nexora IMS",
    eyebrow: "School information management system",
    status: "shipped",
    statusLabel: "Shipped system",
    summary:
      "A multi-role administrative platform engineered through the full path from data and permissions to deployment operations.",
    statement: "One school platform. Many roles. Real deployment constraints.",
    visual: "infrastructure",
    accent: "blue",
    disciplines: ["PostgreSQL", "Docker", "SMS", "VPS", "LiteSpeed"],
    facts: [
      "Multi-role administration and permissions APIs",
      "Automated SMS notifications",
      "Idempotent SQL deployment system",
      "VPS, cPanel, and LiteSpeed delivery",
    ],
    context:
      "Educational administration is not one workflow. The supplied project record describes a platform spanning multiple user roles, notification paths, a PostgreSQL data layer, and the operational realities of live hosting.",
    system:
      "The system combines role-aware application services with PostgreSQL, SMS integration, containerized delivery, and hosting-specific routing. Deployment work extended into cPanel, LiteSpeed, and custom .htaccess configuration for reliable access.",
    decisions: [
      {
        title: "Make deployment repeatable",
        detail:
          "An idempotent SQL deployment approach reduces the risk of running database changes more than once across live environments.",
      },
      {
        title: "Treat hosting as part of the product",
        detail:
          "VPS, cPanel, LiteSpeed, and routing configuration were handled as engineering constraints—not an afterthought.",
      },
      {
        title: "Design around distinct roles",
        detail:
          "Permissions and administration flows were structured for the different responsibilities inside an educational institution.",
      },
    ],
    proof: [
      "Completed system status in the supplied project record",
      "PostgreSQL and Docker deployment path",
      "Live deployment troubleshooting",
      "Custom routing and mobile-network optimization work",
    ],
    reflection:
      "Production engineering is often the work between the application and its environment. This project represents that full-system view: data, roles, notifications, deployment, and the network conditions users actually experience.",
  },
  {
    index: "02",
    slug: "mm2-pattern-miner",
    title: "MM2 Pattern Miner",
    eyebrow: "Symbolic AI · OpenCog Hyperon",
    status: "in-progress",
    statusLabel: "In progress",
    summary:
      "A pattern-mining system inside the Hyperon ecosystem, expanding meaningful conjunctions and measuring what makes them surprising.",
    statement: "Search a hypergraph for patterns worth noticing.",
    visual: "pattern",
    accent: "violet",
    disciplines: ["Hyperon", "MeTTa", "PeTTa", "Rust", "Pattern mining"],
    facts: [
      "Minimum-support filtering",
      "Conjunction expansion",
      "Surprisingness scoring",
      "Rust grounded functions",
    ],
    context:
      "Pattern mining in a symbolic system is not only about frequency. The work explores how candidate patterns expand, survive support constraints, and earn attention through surprisingness inside a hypergraph-based reasoning environment.",
    system:
      "Candidate conjunctions move through expansion and minimum-support filtering before surprisingness evaluation. Rust grounded functions connect lower-level computation into the MeTTa/Hyperon workflow.",
    decisions: [
      {
        title: "Filter before expanding blindly",
        detail:
          "Minimum-support checks constrain the candidate space and keep later scoring focused on patterns with enough evidence.",
      },
      {
        title: "Separate frequency from interest",
        detail:
          "Surprisingness scoring asks whether a supported pattern is informative, rather than treating commonness as the only signal.",
      },
      {
        title: "Debug from evidence",
        detail:
          "Intermediate states and grounded-function behavior are inspected directly instead of relying on assumptions about symbolic execution.",
      },
    ],
    proof: [
      "Defined responsibility for support filtering",
      "Defined responsibility for conjunction expansion",
      "Defined responsibility for surprisingness scoring",
      "Rust grounded-function integration",
    ],
    reflection:
      "This work sits where algorithm design, knowledge representation, and language/runtime behavior meet. The useful habit is the same across all three: expose the intermediate evidence, then reason from it.",
  },
  {
    index: "03",
    slug: "ml-engineering-dojo",
    title: "ML Engineering Dojo",
    eyebrow: "From-scratch learning lab",
    status: "research",
    statusLabel: "Learning lab",
    summary:
      "A disciplined space for moving beneath framework abstractions and rebuilding machine-learning ideas from their mathematical core.",
    statement: "Understand the abstraction by rebuilding what is underneath it.",
    visual: "learning",
    accent: "mint",
    disciplines: ["Python", "Mathematics", "Algorithms", "Evaluation"],
    facts: [
      "Classical ML foundations",
      "From-scratch implementation path",
      "Model evaluation",
      "Deep-learning progression",
    ],
    context:
      "Frameworks accelerate implementation, but they can hide the mechanics that make models succeed or fail. The Dojo is a learning system for turning formulas into tested code before leaning on higher-level tools.",
    system:
      "Each topic moves through a repeatable loop: derive the idea, implement it, inspect behavior, compare outputs, and record where the abstraction becomes useful. Per-algorithm completion status remains deliberately transparent.",
    decisions: [
      {
        title: "Start with the mechanism",
        detail:
          "From-scratch implementations expose assumptions about distance, optimization, splitting, and evaluation that frameworks package away.",
      },
      {
        title: "Separate coursework from implementation",
        detail:
          "A concept can be studied without claiming that a complete, tested implementation is finished; the public status reflects that distinction.",
      },
      {
        title: "Evaluate, then optimize",
        detail: "Correctness and observable model behavior come before premature performance work.",
      },
    ],
    proof: [
      "Completed study of core classical ML topics",
      "Explicit from-scratch implementation direction",
      "Model-evaluation focus",
      "Current progression toward deep learning and transformers",
    ],
    reflection:
      "The goal is not to replace mature libraries. It is to earn a sharper mental model of what those libraries do, where they fail, and which evidence to inspect when results look wrong.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
