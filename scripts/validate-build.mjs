import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const distRoot = join(projectRoot, "dist");
const configuredBase = process.env.BASE_PATH || "/";
const base = configuredBase === "/" ? "/" : `/${configuredBase.replace(/^\/+|\/+$/g, "")}/`;
const errors = [];
const htmlFiles = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith(".html")) htmlFiles.push(path);
  }
}

function localTargetExists(rawValue, sourceFile) {
  if (
    !rawValue ||
    rawValue.startsWith("#") ||
    rawValue.startsWith("mailto:") ||
    rawValue.startsWith("tel:") ||
    rawValue.startsWith("data:") ||
    rawValue.startsWith("http://") ||
    rawValue.startsWith("https://")
  ) {
    return true;
  }

  const cleanValue = rawValue.split(/[?#]/)[0];
  let localPath;

  if (cleanValue.startsWith("/")) {
    if (base !== "/" && !cleanValue.startsWith(base)) return false;
    localPath = base === "/" ? cleanValue.slice(1) : cleanValue.slice(base.length);
  } else {
    localPath = relative(distRoot, resolve(dirname(sourceFile), cleanValue));
  }

  const target = join(distRoot, localPath);
  return existsSync(target) || existsSync(join(target, "index.html"));
}

if (!existsSync(distRoot)) {
  throw new Error("dist/ does not exist. Run npm run build first.");
}

walk(distRoot);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const fileLabel = relative(projectRoot, file);

  if (!/<html\s+lang="en"/.test(html)) errors.push(`${fileLabel}: missing English lang attribute`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${fileLabel}: missing document title`);
  if (!/<main\s[^>]*id="main-content"/.test(html))
    errors.push(`${fileLabel}: missing main landmark`);
  if (!/href="#main-content"/.test(html))
    errors.push(`${fileLabel}: missing skip/back-to-main link`);

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (!localTargetExists(value, file))
      errors.push(`${fileLabel}: unresolved local target ${value}`);
  }

  const forbiddenPatterns = [
    { label: "phone-like value", pattern: /\b09\d{8}\b/ },
    { label: "unapproved Telegram link", pattern: /(?:t|telegram)\.me\//i },
  ];

  for (const forbidden of forbiddenPatterns) {
    if (forbidden.pattern.test(html)) errors.push(`${fileLabel}: contains ${forbidden.label}`);
  }
}

for (const required of ["index.html", "404.html", "sitemap-index.xml", "social-card.png"]) {
  if (!existsSync(join(distRoot, required)))
    errors.push(`dist/${required}: required output missing`);
}

if (errors.length) {
  console.error(`Build validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages at base ${base}.`);
console.log(
  "Internal targets resolve, required metadata outputs exist, and private contact values are absent.",
);
