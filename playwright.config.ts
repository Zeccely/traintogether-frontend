import { defineConfig, devices } from "@playwright/test";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";

if (process.env.CI) {
  const requiredUrls = [
    ["PLAYWRIGHT_BASE_URL", baseURL, "http://localhost:3000"],
    ["APP_URL", process.env.APP_URL, "http://localhost:3000"],
    ["BACKEND_URL", process.env.BACKEND_URL, "http://localhost:8081"],
  ] as const;

  for (const [name, value, expectedOrigin] of requiredUrls) {
    if (!value || new URL(value).origin !== expectedOrigin) {
      throw new Error(
        `Refusing to run E2E tests with ${name}=${value ?? "<missing>"}. Expected the isolated test service at ${expectedOrigin}.`,
      );
    }
  }
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "node node_modules/next/dist/bin/next dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
