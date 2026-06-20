import { useState } from "react";
import ConfirmationWindow from "@/components/shared/confirmation-window";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteMyGoal } from "@/lib/api/goals";
import { Goal } from "@/lib/types/goal";
import { Trash2 } from "lucide-react";

type MyGoalProps = {
  goal: Goal;
  onDeleted: () => void;
};

export default function MyGoal({ goal, onDeleted }: MyGoalProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isConfirmingEntryDeletion, setIsConfirmingEntryDeletion] = useState(false);
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
      setIsConfirmingEntryDeletion(false);
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
            size="icon-sm"
            aria-label="Delete goal"
            onClick={() => setIsConfirmingDelete(true)}
          >
            <Trash2 />
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
        onCancel={() => setIsConfirmingDelete(false)}
        onConfirm={() => {
          setIsConfirmingDelete(false);
          setIsConfirmingEntryDeletion(true);
        }}
      />
      <ConfirmationWindow
        isOpen={isConfirmingEntryDeletion}
        title="Delete all entries?"
        message="Deleting your goal will also delete your entire workout history. Do you still want to continue?"
        isPending={isDeleting}
        confirmLabel="Delete goal and entries"
        onCancel={() => setIsConfirmingEntryDeletion(false)}
        onConfirm={handleDelete}
      />
    </Card>
  );
}
