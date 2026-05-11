export interface GoalCreation {
  userId: number;
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
