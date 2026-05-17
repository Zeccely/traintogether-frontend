import { Goal, GoalCreation } from "@/lib/types/goal";

export async function createGoal(input: GoalCreation): Promise<Goal> {
  const response = await fetch("http://localhost:8080/api/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create goal");
  }

  return response.json();
}

export async function getGoals(): Promise<Goal[]> {
  const response = await fetch("http://localhost:8080/api/goals", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Goal not found");
  }

  return await response.json();
}

export async function getMyGoal(): Promise<Goal | null> {
  const response = await fetch("http://localhost:8080/api/goals/my-goal", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Goal not found");
  }

  return await response.json();
}
