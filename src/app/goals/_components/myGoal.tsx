import { useState } from "react";
import ConfirmationWindow from "@/components/shared/confirmation-window";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteMyGoal } from "@/lib/api/goals";
import { Goal } from "@/lib/types/goal";

type MyGoalProps = {
  goal: Goal;
  onDeleted: () => void;
};

export default function MyGoal({ goal, onDeleted }: MyGoalProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleDelete() {
    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await deleteMyGoal();
      onDeleted();
    } catch (error) {
      console.error("Error deleting goal:", error);
      setIsConfirmingDelete(false);
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Could not delete your goal. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Goal</CardTitle>
        <CardAction>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setIsConfirmingDelete(true)}
          >
            Delete
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="font-medium">{goal.title}</p>
          {goal.description ? (
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          ) : null}
          <p className="text-sm text-muted-foreground">{goal.frequencyTarget} times per week</p>
          {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        </div>
      </CardContent>
      <ConfirmationWindow
        isOpen={isConfirmingDelete}
        title="Delete goal?"
        message="Are you sure you want to delete your goal?"
        isPending={isDeleting}
        onCancel={() => setIsConfirmingDelete(false)}
        onConfirm={handleDelete}
      />
    </Card>
  );
}
