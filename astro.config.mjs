import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const base = process.env.BASE_PATH || "/";
const site = process.env.SITE_URL || "https://yonayetol.github.io";

export default defineConfig({
  site,
  base,
  output: "static",
  build: {
    format: "directory",
  },
  integrations: [sitemap()],
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
