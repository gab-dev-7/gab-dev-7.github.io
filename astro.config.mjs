import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import path from "path";

// Get the absolute path for project root
const projectRoot = path.resolve(process.cwd());

export default defineConfig({
  site: "https://gawindlin.com/", // Your custom domain
  base: "/",
  integrations: [tailwind(), icon()],
  output: "static", // Ensure static output for GitHub Pages

  // --- CRITICAL VITE/ROLLUP FIX ---
  vite: {
    resolve: {
      alias: {
        // 1. Alias the cv.json file for easy import
        "@cv": path.resolve(projectRoot, "./cv.json"),
      },
    },
    optimizeDeps: {
      // 2. CRITICAL: Tells Vite to optimize/bundle the custom web component dependency
      include: ["ninja-keys"],
    },
  },
});
