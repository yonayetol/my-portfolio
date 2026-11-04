export type ProjectStatus = "shipped" | "in-progress" | "research";
export type ProjectVisual = "infrastructure" | "pattern" | "management" | "examination";

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
  image?: {
    src: string;
    smallSrc: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  };
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
    slug: "zikuala-management-system",
    title: "Zikuala Management System",
    eyebrow: "School operations · Academic workflows",
    status: "in-progress",
    statusLabel: "In progress",
    summary:
      "A school management system connecting public information, an eLearning catalogue, and role-aware academic and administrative work.",
    statement: "A clearer home for a school's information and everyday work.",
    visual: "management",
    image: {
      src: "images/projects/zikuala-school-home.webp",
      smallSrc: "images/projects/zikuala-school-home-small.webp",
      width: 1600,
      height: 744,
      alt: "Ziquala Abo School homepage with its school building, school and monastery navigation, eLearning, and portal login.",
      caption:
        "The public homepage for Ziquala Abo School, with school information, eLearning, and portal access.",
    },
    accent: "mint",
    disciplines: ["React", "TypeScript", "Express", "PostgreSQL", "Academic workflows"],
    facts: [
      "Separate public school and monastery sections",
      "Searchable eLearning catalogue and document viewer",
      "Academic and administrative role-based interfaces",
      "Frontend foundation with backend integration in progress",
    ],
    context:
      "School information serves different audiences: families exploring a school, students finding learning material, and staff managing academic work. Zikuala brings those journeys together while keeping their responsibilities distinct.",
    system:
      "The frontend includes public information, a searchable eLearning catalogue, and academic and administrative portal views. A TypeScript, Express, and PostgreSQL backend provides the API foundation. Frontend demonstrations and backend integration remain distinct; the project is presented as in progress.",
    decisions: [
      {
        title: "Keep the public journeys distinct",
        detail:
          "School information and the monastery section have separate routes and media treatment, so each audience can find the context it needs.",
      },
      {
        title: "Make learning materials findable",
        detail:
          "The eLearning frontend supports title search, grade and subject filters, document previews, and publishing controls. Persistence and permission enforcement are backend integration work.",
      },
      {
        title: "Match the portal to its actual scope",
        detail:
          "Academic and administrative roles shape navigation and workflows. Unrelated finance, clinic, transport, and auditing modules are excluded from this project.",
      },
    ],
    proof: [
      "Implemented public routes and academic portal frontend",
      "eLearning catalogue, filters, and document-reader interfaces",
      "Academic Manager workspace and demonstration gradebook",
      "Separate backend API foundation and documented integration priorities",
    ],
    reflection:
      "A management system becomes clearer when its boundaries are clear. Public information, learning materials, and academic operations need to connect without turning every role into the same dashboard.",
  },
  {
    index: "04",
    slug: "digital-examination-analysis",
    title: "Digital Examination & Analysis",
    eyebrow: "Ongoing work · Exams and post-exam analysis",
    status: "in-progress",
    statusLabel: "In progress",
    summary:
      "An ongoing examination platform spanning paper preparation, student exam delivery, and post-exam results and analysis for schools.",
    statement:
      "Follow the whole examination journey, from preparation to understanding the results.",
    visual: "examination",
    image: {
      src: "images/projects/digital-examination-analysis.webp",
      smallSrc: "images/projects/digital-examination-analysis-small.webp",
      width: 1600,
      height: 1000,
      alt: "Digital examination results interface showing a sample marks table, score-distribution chart, and topic-performance bars.",
      caption:
        "Results, score distribution, and topic analysis in the examination interface, shown with demonstration data.",
    },
    accent: "amber",
    disciplines: ["React", "TypeScript", "IndexedDB", "Exam delivery", "Results analysis"],
    facts: [
      "Teacher preparation and administrator review workflows",
      "Scheduled exams and durable student answer handling",
      "Results reports, topic charts, and CSV export interfaces",
      "Ongoing backend integration and acceptance work",
    ],
    context:
      "A digital exam is more than a question screen. Teachers prepare papers, administrators organize sittings, students need reliable answer handling, and the results must help people understand what happened afterward.",
    system:
      "The frontend connects teacher preparation, administrative scheduling, student delivery, and results views. Answer persistence distinguishes local saves from server receipt. Post-exam workflows include role-scoped reports, topic analysis, exports, recovery review, and separately released practice. Real-backend acceptance and production readiness remain ongoing work.",
    decisions: [
      {
        title: "Make answer state understandable",
        detail:
          "A device save, an uploaded answer, and a confirmed final submission are different states. The interface keeps that distinction visible during interruptions and recovery.",
      },
      {
        title: "Treat results as a controlled workflow",
        detail:
          "Scheduled release, role-scoped reports, and retained result revisions shape the results flow. Practice scores stay separate from official marks.",
      },
      {
        title: "Connect assessment to useful analysis",
        detail:
          "Results interfaces combine reports, topic charts, and export paths so staff can inspect performance after an exam. Synthetic demonstrations do not establish real-school adoption or production capacity.",
      },
    ],
    proof: [
      "Teacher, student, and administrator examination interfaces",
      "Durable answer handling and explicit recovery states",
      "Post-exam reporting, topic charts, and export interfaces",
      "Documented separation of synthetic checks from real-backend acceptance",
    ],
    reflection:
      "The most important work is often between the obvious screens: preserving a student's answers, describing uncertainty honestly, and turning an assessment into information that teachers and students can use.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
