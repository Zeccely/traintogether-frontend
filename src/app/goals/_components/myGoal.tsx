import { Goal } from "@/lib/types/goal";

type MyGoalProps = {
  goal: Goal;
};

export default async function MyGoal({ goal }: MyGoalProps) {
  return (
    <div className="max-w-md mx-auto">
      <h1>My Goal</h1>
      <p>{goal.description}</p>
    </div>
  );
}
