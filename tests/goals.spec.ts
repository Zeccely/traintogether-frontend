import { expect, test, Page } from "@playwright/test";
import { createRandomUser, signUpUser, loginUser } from "./helpers/test-user";

const goalFormHeading = "Make a Goal to Achieve!";

async function loginWithTestUser(page: Page) {
  const user = createRandomUser();

  await signUpUser(page, user);
  await loginUser(page, user);
}

async function deleteGoal(page: Page) {
  await page.getByRole("link", { name: "Goals" }).click();
  await expect(page).toHaveURL(/\/goals/);

  const deleteGoalButton = page.getByRole("button", { name: "Delete goal" });

  try {
    await expect(deleteGoalButton).toBeVisible({ timeout: 2_000 });
  } catch {
    return;
  }

  await deleteGoalButton.click();

  await page
    .getByRole("dialog", { name: "Delete goal?" })
    .getByRole("button", { name: "Delete" })
    .click();

  await page
    .getByRole("dialog", { name: "Delete all entries?" })
    .getByRole("button", { name: "Delete goal and entries" })
    .click();

  await expect(page.getByText(goalFormHeading)).toBeVisible();
}

async function createGoal(page: Page, goalTitle: string) {
  await page.getByPlaceholder("Title").fill(goalTitle);
  await page.getByPlaceholder("Description").fill("Created during e2e");
  await page.getByPlaceholder("Frequency Target").fill("3");

  await page.getByRole("button", { name: "Create Goal" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.locator("main").getByText(goalTitle)).toBeVisible();
}

test.describe("Goals page", () => {
  test("redirects to login if not authenticated", async ({ page }) => {
    await page.goto("/goals");

    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Authenticated goals page", () => {
  test.beforeEach(async ({ page }) => {
    await loginWithTestUser(page);

    await page.getByRole("link", { name: "Goals" }).click();
    await expect(page).toHaveURL(/\/goals/);
  });

  test("displays the goals page", async ({ page }) => {
    await expect(page).toHaveURL(/\/goals/);
    await expect(page.getByText(goalFormHeading)).toBeVisible();
  });

  test("creates a goal", async ({ page }) => {
    const goalTitle = `Playwright goal ${Date.now()}`;

    await createGoal(page, goalTitle);
  });

  test("deletes a goal after creating it", async ({ page }) => {
    const goalTitle = `Playwright goal to delete ${Date.now()}`;

    await createGoal(page, goalTitle);
    await deleteGoal(page);

    await expect(page.getByText(goalFormHeading)).toBeVisible();
    await expect(page.getByText(goalTitle)).not.toBeVisible();
  });
});
