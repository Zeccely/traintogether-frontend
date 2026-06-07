import { expect, test } from "@playwright/test";
import { createRandomUser, signUpUser, loginUser } from "./helpers/test-user";

test.describe("Dashboard page", () => {
  test("redirects to login if not authenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Authenticated dashboard page", () => {
  test.beforeEach(async ({ page }) => {
    const user = createRandomUser();

    await signUpUser(page, user);
    await loginUser(page, user);
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
