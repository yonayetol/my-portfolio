export type CredentialCategory = "Foundations" | "ML & Deep Learning" | "Applied AI";

export interface Credential {
  title: string;
  category: CredentialCategory;
  provider: "Coursera";
  href: string;
}

export const credentials: Credential[] = [
  {
    title: "Linear Algebra for Machine Learning and Data Science",
    category: "Foundations",
    provider: "Coursera",
    href: "https://www.coursera.org/account/accomplishments/verify/U9XM1O97NHZH",
  },
  {
    title: "Probability & Statistics for Machine Learning & Data Science",
    category: "Foundations",
    provider: "Coursera",
    href: "https://www.coursera.org/account/accomplishments/verify/6JBIS7KF2TT5",
  },
  {
    title: "Exploratory Data Analysis for Machine Learning",
    category: "Foundations",
    provider: "Coursera",
    href: "https://www.coursera.org/account/accomplishments/verify/H01Q44AUF0PG",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    category: "ML & Deep Learning",
    provider: "Coursera",
    href: "https://www.coursera.org/account/accomplishments/verify/V70U9Y4KZMHA",
  },
  {
    title: "Neural Networks and Deep Learning",
    category: "ML & Deep Learning",
    provider: "Coursera",
    href: "https://www.coursera.org/account/accomplishments/verify/0HFSWYUMTJFI",
  },
  {
    title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    category: "ML & Deep Learning",
    provider: "Coursera",
    href: "https://coursera.org/share/fcd2109f7003076d503060daf6a563f4",
  },
  {
    title: "Natural Language Processing with Classification and Vector Spaces",
    category: "Applied AI",
    provider: "Coursera",
    href: "https://www.coursera.org/account/accomplishments/records/UQ25QTXDGGOM",
  },
  {
    title: "Mastering Claude Code: From Setup to Real Projects",
    category: "Applied AI",
    provider: "Coursera",
    href: "https://www.coursera.org/account/accomplishments/certificate/13ZXIO2J2MXC",
  },
  {
    title: "Claude Code: Software Engineering with Generative AI Agents",
    category: "Applied AI",
    provider: "Coursera",
    href: "https://www.coursera.org/account/accomplishments/certificate/K5Y1CP8GAHSQ",
  },
];

export const credentialCategories: CredentialCategory[] = [
  "Foundations",
  "ML & Deep Learning",
  "Applied AI",
];
