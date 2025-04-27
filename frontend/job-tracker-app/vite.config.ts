import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";

// Read the version from package.json
let version :string = "1.0.0"; // Default fallback version
try {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
  version = packageJson.version || version;
} catch (error) {
  console.error("Failed to read version from package.json:", error);
}

// Use the build number from the environment variable
const buildNumber :string = process.env.BUILD_NUMBER || "local";

// Combine version and Git hash
const gitVersion = `${version}-build.${buildNumber}`;

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
