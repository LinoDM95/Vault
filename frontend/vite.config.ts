import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ["**/__tests__/**/*.{js,jsx,ts,tsx}"],
  },
  build: {
    // Falls vite.config.js in /frontend liegt, gehen wir eine Ebene nach oben
    // => /DjangoProjekt/dist
    outDir: '../backend/dist',
    manifest: true,
    rollupOptions: {
      input: './src/main.jsx'
    },
  },
});
