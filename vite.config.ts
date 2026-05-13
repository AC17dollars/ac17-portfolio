import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// `import.meta.dirname` resolves to the directory containing this config
// file, which is the project root. Vite's `root` is `src/client`, so build
// output and aliases are anchored from the project root.
const projectRoot = import.meta.dirname;

export default defineConfig(() => {
  return {
    root: path.resolve(projectRoot, "src/client"),
    publicDir: "public",
    server: {
      port: 3000,
      host: "0.0.0.0",
      strictPort: true,
      proxy: {
        "/api": {
          target: "http://localhost:8788",
          changeOrigin: true,
        },
        "/.well-known": {
          target: "http://localhost:8788",
          changeOrigin: true,
        },
      },
    },
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(projectRoot, "./src"),
        "@shared": path.resolve(projectRoot, "./src/shared"),
      },
    },
    build: {
      outDir: path.resolve(projectRoot, "dist"),
      emptyOutDir: true,
    },
  };
});
