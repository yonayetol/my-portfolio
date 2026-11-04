import { credentials } from "./credentials";

export type CourseDemo =
  "vectors" | "activation" | "tokens" | "bayes" | "regression" | "outliers" | "descent";

export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  color: string;
  summary: string;
  topics: string[];
  demo: CourseDemo;
  certificateHref?: string;
}

const records: Omit<Course, "certificateHref">[] = [
  {
    id: "course-linear-algebra",
    title: "Linear Algebra for Machine Learning and Data Science",
    shortTitle: "Linear Algebra",
    color: "#47645c",
    summary:
      "The geometry beneath machine learning: representing information, transforming spaces, and solving systems.",
    topics: [
      "Vectors and matrices: operations, properties, and geometric meaning",
      "Dot products, angles, and projections",
      "Rank, determinants, inverses, and row echelon form",
      "Linear transformations and systems of linear equations",
      "Eigenvalues, eigenvectors, and principal component analysis",
      "Connections to regression, optimization, and model training",
    ],
    demo: "vectors",
  },
  {
    id: "course-neural-networks",
    title: "Neural Networks and Deep Learning",
    shortTitle: "Neural Networks",
    color: "#84604d",
    summary:
      "From a single neuron to layered models: how predictions flow forward and learning flows backward.",
    topics: [
      "Neurons, ReLU, and sigmoid activation functions",
      "Input, hidden, and output layers",
      "Forward propagation and mean squared error losses",
      "Backpropagation and gradient descent",
      "Dropout and L2 regularization",
      "Adam and RMSprop optimization",
    ],
    demo: "activation",
  },
  {
    id: "course-nlp",
    title: "Natural Language Processing with Classification and Vector Spaces",
    shortTitle: "Language & Vectors",
    color: "#536787",
    summary:
      "Turning language into useful representations, then using those representations to classify and compare text.",
    topics: [
      "Tokenization, stemming, and stopword processing",
      "Bag-of-words representations and feature extraction",
      "Word2Vec and GloVe word embeddings",
      "Logistic regression and Naive Bayes classifiers",
      "Classification accuracy",
      "Applications in sentiment analysis and machine translation",
    ],
    demo: "tokens",
  },
  {
    id: "course-probability",
    title: "Probability & Statistics for Machine Learning & Data Science",
    shortTitle: "Probability & Statistics",
    color: "#8b734a",
    summary:
      "A language for uncertainty: understanding distributions, summarizing observations, and updating beliefs with evidence.",
    topics: [
      "Basic and conditional probability, Bayes’ theorem",
      "Discrete and continuous random variables",
      "Normal and binomial distributions",
      "Mean, median, variance, and standard deviation",
      "Sampling and the central limit theorem",
      "Bayesian updates from new evidence",
    ],
    demo: "bayes",
  },
  {
    id: "course-supervised-learning",
    title: "Supervised Machine Learning: Regression and Classification",
    shortTitle: "Supervised Learning",
    color: "#776184",
    summary:
      "Learning from labeled examples, measuring prediction error, and choosing models that generalize.",
    topics: [
      "Supervised and unsupervised learning",
      "Linear and multiple regression with mean squared error",
      "Binary and multiclass logistic classification",
      "Accuracy and micro-averaged F1",
      "Overfitting, underfitting, and feature selection",
      "Train/test splits, cross-validation, and grid/random hyperparameter search",
    ],
    demo: "regression",
  },
  {
    id: "course-eda",
    title: "Exploratory Data Analysis for Machine Learning",
    shortTitle: "Exploratory Data Analysis",
    color: "#8e6151",
    summary:
      "Look closely before modeling: inspect the data, find unusual values, and make patterns visible.",
    topics: [
      "Data inspection, types, and quality",
      "Missing values and outliers",
      "Mean, median, and variance",
      "Visualizing patterns and distributions",
      "Correlations between variables",
    ],
    demo: "outliers",
  },
  {
    id: "course-optimization",
    title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    shortTitle: "Tuning & Optimization",
    color: "#59717b",
    summary:
      "Making learning more reliable through thoughtful optimization, regularization, and training choices.",
    topics: [
      "Learning-rate and batch-size tuning",
      "L1 and L2 regularization, dropout",
      "Adam and RMSprop optimizers",
      "Learning-rate schedules",
      "Batch normalization",
    ],
    demo: "descent",
  },
];

export const courses: Course[] = records.map((course) => ({
  ...course,
  certificateHref: credentials.find((credential) => credential.title === course.title)?.href,
}));
