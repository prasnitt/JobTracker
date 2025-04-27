import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { execSync } from "child_process";

// Get the Git version using the desired command
let gitVersion = "unknown"; // Fallback value in case of an error
try {
  gitVersion = execSync("git describe --tags --long --dirty --always")
    .toString()
    .trim();
} catch (error) {
  console.error("Failed to retrieve Git version:", error.message);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(gitVersion), // Inject the version as a global constant
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
