import { expect, test } from "@playwright/test";
import { createRandomUser, loginUser, signUpUser } from "./helpers/test-user";

test.describe("Login page", () => {
  test("logs in a user when the form is filled out", async ({ page }) => {
    const user = createRandomUser();

    await signUpUser(page, user);
    await loginUser(page, user);

    await expect(page).toHaveURL(/\/dashboard/);
  });
});
