import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ["**/__tests__/**/*.{js,jsx,ts,tsx}"],
  },
  build: {
    outDir: "../backend/dist",
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});
