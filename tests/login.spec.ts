import { expect, test } from "@playwright/test";

test("shows the login page", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByText("Log In", { exact: true })).toBeVisible();
  await expect(page.getByPlaceholder("Username")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();
});
