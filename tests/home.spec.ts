import { expect, test } from "@playwright/test";
import { createRandomUser, loginUser, signUpUser } from "./helpers/test-user";

test.describe("Home page", () => {
  test("shows the welcome page when not authenticated", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Welcome to TrainTogether" })).toBeVisible();
    await expect(page).toHaveURL("/");
  });

  test("redirects to the dashboard when authenticated", async ({ page }) => {
    const user = createRandomUser();

    await signUpUser(page, user);
    await loginUser(page, user);

    await page.goto("/");

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.locator("main").getByText("Today's Workout", { exact: true })).toBeVisible();
  });
});
