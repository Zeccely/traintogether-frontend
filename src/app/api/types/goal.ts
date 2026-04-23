import { GoalProgress } from "./goalProgress";

export interface CreateGoalInput {
  title: string;
  description?: string;
  frequencyTarget: number;
}

export interface Goal {
  title: string;
  description?: string;
  frequencyTarget: number;
  progress: GoalProgress;
}
