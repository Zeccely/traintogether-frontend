import { Goal, GoalCreation } from "@/lib/types/goal";

export async function createGoal(input: GoalCreation): Promise<Goal> {
  const response = await fetch("/api/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Failed to create goal");
  }

  return response.json();
}

export async function getGoals(): Promise<Goal[]> {
  const response = await fetch("/api/goals", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Could not load goals.");
  }

  return await response.json();
}

export async function getMyGoal(): Promise<Goal | null> {
  const response = await fetch("/api/goals/my-goal", {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error((await response.text()) || "Could not load your goal.");
  }

  return await response.json();
}

export async function deleteMyGoal(): Promise<void> {
  const response = await fetch("/api/goals/my-goal", {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Failed to delete goal");
  }
}
