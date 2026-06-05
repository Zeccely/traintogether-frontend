import { expect, test } from "@playwright/test";

test.describe("Dashboard page", () => {
  test("redirects to login if not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Authenticated dashboard page", () => {
  test.beforeEach(async ({ page }) => {
    const username = process.env.TEST_USER_USERNAME;
    const password = process.env.TEST_USER_PASSWORD;

    if (!username || !password) {
      throw new Error("Missing TEST_USER_USERNAME or TEST_USER_PASSWORD in .env.local");
    }

    await page.goto("/login");
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("displays the dashboard after logging in", async ({ page }) => {
    await expect(page.locator("main").getByText("Today's Workout", { exact: true })).toBeVisible();
    await expect(page.locator("main").getByText("Goals", { exact: true })).toBeVisible();
  });

  test("navigates to goals from dashboard", async ({ page }) => {
    await page.getByRole("link", { name: "Goals" }).click();
    await expect(page).toHaveURL(/\/goals/);
  });

  test("logs out from the dashboard", async ({ page }) => {
    await page.getByRole("button", { name: "Logout" }).click();

    await expect(page).toHaveURL(/\/login/);
  });
});
