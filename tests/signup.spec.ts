import { test } from "@playwright/test";
import { signUpAsUser } from "./helpers/auth";

const testUsername = `e2e-user-${Date.now()}`;
const testPassword = "Password123!";
const testName = "E2E User";

test.describe("Signup page", () => {
  test("creates a new user", async ({ page }) => {
    await signUpAsUser(page, testUsername, testPassword, testName);
  });
});
