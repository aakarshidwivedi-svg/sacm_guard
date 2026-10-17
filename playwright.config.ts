import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests", use: { baseURL: "http://localhost:5173" },
  webServer: [
    { command: "npm run dev:server", port: 3001, reuseExistingServer: true, env: { ANTHROPIC_API_KEY: "" } },
    { command: "npm run dev:client", port: 5173, reuseExistingServer: true },
  ],
});
