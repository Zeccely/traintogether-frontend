import { expect, test } from "@playwright/test";

test.describe("Login page", () => {
  test("logs in a user when the form is filled out", async ({ page }) => {
    await page.goto("/login");
    await page.getByPlaceholder("Username").fill("Jess");
    await page.getByPlaceholder("Password").fill("jess12");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page).toHaveURL(/\/dashboard/);
  });
});
