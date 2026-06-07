import { expect, Page } from "@playwright/test";

export type TestUser = {
  username: string;
  passwordInput: string;
  desiredName: string;
};

export function createRandomUser(): TestUser {
  return {
    username: `e2e-user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    passwordInput: "Password123!",
    desiredName: "E2E User",
  };
}

export async function signUpUser(page: Page, user: TestUser) {
  await page.goto("/signup");

  await page.getByPlaceholder("Username").fill(user.username);
  await page.getByPlaceholder("Password").fill(user.passwordInput);
  await page.getByPlaceholder("What do you want to be called?").fill(user.desiredName);

  await page.getByRole("button", { name: "Sign Up" }).click();

  page.on("response", async (response) => {
    if (response.url().includes("/api/users")) {
      console.log("SIGNUP STATUS:", response.status());
      console.log("SIGNUP URL:", response.url());
      console.log("SIGNUP BODY:", await response.text());
    }
  });

  await expect(page.getByText("User created!")).toBeVisible();
}

export async function loginUser(page: Page, user: TestUser) {
  await page.goto("/login");

  await page.getByPlaceholder("Username").fill(user.username);
  await page.getByPlaceholder("Password").fill(user.passwordInput);

  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
}
