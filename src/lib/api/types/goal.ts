import { GoalProgress } from "./goalProgress";

export interface CreateGoalInput {
  title: string;
  description?: string;
  frequencyTarget: number;
}

export interface Goal {
  userId: number;
  title: string;
  description?: string;
  frequencyTarget: number;
}
