import { GoalProgress } from "@/lib/types/goalProgress";

export async function logTodaysWorkout(): Promise<GoalProgress> {
  const response = await fetch("/api/goal-progress/my-goal/today", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Could not log today's workout.");
  }

  return response.json();
}

export async function isTodaysWorkoutLogged(): Promise<boolean> {
  const response = await fetch("/api/goal-progress/my-goal/today", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Could not check today's workout.");
  }

  return response.json();
}

export async function getMyGoalProgress(): Promise<GoalProgress[]> {
  const response = await fetch("/api/goal-progress/my-goal", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Could not load workout history.");
  }

  return response.json();
}
