import { expect, test } from "@playwright/test";
import { createGoal } from "./helpers/test-goal";
import { createRandomUser, loginUser, signUpUser } from "./helpers/test-user";

test.describe("Groups page", () => {
  test("redirects to login if not authenticated", async ({ page }) => {
    await page.goto("/groups");

    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Authenticated groups page", () => {
  test.beforeEach(async ({ page }) => {
    const user = createRandomUser();

    await signUpUser(page, user);
    await loginUser(page, user);
  });

  test("asks the user to create a goal before joining or creating groups", async ({ page }) => {
    await page.getByRole("link", { name: "Groups" }).click();

    await expect(page).toHaveURL(/\/groups/);
    await expect(page.getByText("No Goal Created!")).toBeVisible();
    await expect(page.getByText("You need a goal before joining a group.")).toBeVisible();

    await page.getByRole("link", { name: "Create a goal" }).click();

    await expect(page).toHaveURL(/\/goals/);
    await expect(page.getByText("Make a Goal to Achieve!")).toBeVisible();
  });

  test("creates a group after the user has a goal", async ({ page }) => {
    const goalTitle = `Playwright group goal ${Date.now()}`;
    const groupName = `Playwright group ${Date.now()}`;

    await createGoal(page, goalTitle);
    await page.getByRole("link", { name: "Groups" }).click();

    await expect(page).toHaveURL(/\/groups/);
    await expect(page.getByText("Create a group")).toBeVisible();
    await expect(page.getByText("Join a group")).toBeVisible();

    await page.getByPlaceholder("Group name").fill(groupName);
    await page.getByRole("button", { name: "Create group" }).click();

    await expect(page.getByText(groupName)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Teammates" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Leave group" })).toBeEnabled();

    await page.getByRole("link", { name: "Goals" }).click();

    await expect(page).toHaveURL(/\/goals/);
    await expect(page.getByRole("button", { name: "Delete goal" })).toBeDisabled();
  });
});
