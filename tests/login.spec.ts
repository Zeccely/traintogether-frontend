import { expect, test } from "@playwright/test";

test.describe("Login page", () => {
  test("logs in a user when the form is filled out", async ({ page }) => {
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
});
