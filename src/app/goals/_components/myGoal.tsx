import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Goal } from "@/lib/types/goal";

type MyGoalProps = {
  goal: Goal;
};

export default function MyGoal({ goal }: MyGoalProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="font-medium">{goal.title}</p>
          {goal.description ? (
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          ) : null}
          <p className="text-sm text-muted-foreground">
            {goal.frequencyTarget} times per week
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
