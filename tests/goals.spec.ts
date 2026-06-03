import { expect, test } from "@playwright/test";
import { loginWithCredentials, signUpAsUser } from "./helpers/auth";

test.describe("Goals page", () => {
  test("redirects to login if not authenticated", async ({ page }) => {
    await page.goto("/goals");

    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Authenticated goals page", () => {
  test.beforeEach(async ({ page }) => {
    const testUsername = `e2e-goals-user-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const testPassword = "Password123!";
    const testName = "E2E Goals User";

    await signUpAsUser(page, testUsername, testPassword, testName);
    await loginWithCredentials(page, testUsername, testPassword);
    await page.goto("/goals");
  });

  test("displays the goals page", async ({ page }) => {
    await expect(page).toHaveURL(/\/goals/);
  });

  test("creates a goal", async ({ page }) => {
    const goalTitle = `Playwright goal ${Date.now()}`;

    await page.getByPlaceholder("Title").fill(goalTitle);
    await page.getByPlaceholder("Description").fill("Created during e2e");
    await page.getByPlaceholder("Frequency Target").fill("3");
    await page.getByRole("button", { name: "Create Goal" }).click();

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator("main").getByText(goalTitle)).toBeVisible();
  });
});
