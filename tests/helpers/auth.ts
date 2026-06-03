import { expect, type Page } from "@playwright/test";

const username = process.env.TEST_USER_USERNAME;
const password = process.env.TEST_USER_PASSWORD;

export async function loginAsUser(page: Page) {
  if (!username || !password) {
    throw new Error("Missing TEST_USER_USERNAME or TEST_USER_PASSWORD in .env.local");
  }

  await loginWithCredentials(page, username, password);
}

export async function loginWithCredentials(page: Page, username: string, password: string) {
  await page.goto("/login");
  await page.getByPlaceholder("Username").fill(username);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
}

export async function signUpAsUser(
  page: Page,
  testUsername: string,
  testPassword: string,
  testName: string,
) {
  await page.goto("/signup");

  await page.getByPlaceholder("Username").fill(testUsername);
  await page.getByPlaceholder("Password").fill(testPassword);
  await page.getByPlaceholder("What do you want to be called?").fill(testName);
  await page.getByRole("button", { name: "Sign Up" }).click();

  await expect(page.getByText("User created!")).toBeVisible();
}
