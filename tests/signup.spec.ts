import { expect, test } from "@playwright/test";

test.describe("Signup page", () => {
  test("creates a new user", async ({ page }) => {
    const testUsername = `e2e-user-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const testPassword = "Password123!";
    const testName = "E2E User";

    await page.goto("/signup");
    await page.getByPlaceholder("Username").fill(testUsername);
    await page.getByPlaceholder("Password").fill(testPassword);
    await page.getByPlaceholder("What do you want to be called?").fill(testName);
    await page.getByRole("button", { name: "Sign Up" }).click();

    await expect(page.getByText("User created!")).toBeVisible();
  });
});
