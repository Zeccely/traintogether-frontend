export interface GoalCreation {
  title: string;
  description?: string;
  frequencyTarget: number;
}

export interface Goal {
  title: string;
  description?: string;
  frequencyTarget: number;
  creationDate: string;
}
