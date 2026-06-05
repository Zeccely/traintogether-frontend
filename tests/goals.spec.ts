import { expect, test } from "@playwright/test";

const goalFormHeading = "Make a Goal to Achieve!";

async function loginWithTestUser(page: import("@playwright/test").Page) {
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
}

async function leaveGroupIfNeeded(page: import("@playwright/test").Page) {
  await page.getByRole("link", { name: "Groups" }).click();
  await expect(page).toHaveURL(/\/groups/);

  const leaveGroupButton = page.getByRole("button", { name: "Leave group" });

  try {
    await expect(leaveGroupButton).toBeVisible({ timeout: 2_000 });
  } catch {
    return;
  }

  await leaveGroupButton.click();
  await page
    .getByRole("dialog", { name: "Leave group?" })
    .getByRole("button", { name: "Leave" })
    .click();
  await expect(page.getByPlaceholder("Group name")).toBeVisible();
}

async function deleteGoal(page: import("@playwright/test").Page) {
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

async function createGoal(page: import("@playwright/test").Page, goalTitle: string) {
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
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await loginWithTestUser(page);
    await leaveGroupIfNeeded(page);
    await deleteGoal(page);
  });

  test("displays the goals page", async ({ page }) => {
    await expect(page).toHaveURL(/\/goals/);
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
