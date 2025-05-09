import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      // This is needed for React 18
      jsxRuntime: "automatic",
      // Add Babel configuration if needed
      babel: {
        babelrc: false,
        configFile: false,
      },
      // Include .js files as JSX
      include: "**/*.{jsx,js}",
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      Functions: path.resolve(__dirname, "./src/utils/Functions.js"),
      Components: path.resolve(__dirname, "./src/Components"),
      assets: path.resolve(__dirname, "./src/assets"),
      Customer: path.resolve(__dirname, "./src/Customer"),
      Pages: path.resolve(__dirname, "./src/Pages"),
      store: path.resolve(__dirname, "./src/store"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  esbuild: {
    jsx: "automatic",
    jsxInject: `import React from 'react'`,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
