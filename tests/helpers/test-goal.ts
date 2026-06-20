import { expect, Page } from "@playwright/test";

export async function createGoal(page: Page, goalTitle: string) {
  await page.getByRole("link", { name: "Goals" }).click();
  await expect(page).toHaveURL(/\/goals/);

  await page.getByPlaceholder("Title").fill(goalTitle);
  await page.getByPlaceholder("Description").fill("Created during e2e");
  await page.getByPlaceholder("Frequency Target").fill("3");

  await page.getByRole("button", { name: "Create Goal" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.locator("main").getByText(goalTitle)).toBeVisible();
}
