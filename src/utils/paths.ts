export function withBase(path = "/"): string {
  const configuredBase = import.meta.env.BASE_URL;
  const base = configuredBase.endsWith("/") ? configuredBase : `${configuredBase}/`;
  const normalizedPath = path.replace(/^\//, "");

  if (!normalizedPath) return base;
  return `${base}${normalizedPath}`.replace(/\/+/g, "/");
}
