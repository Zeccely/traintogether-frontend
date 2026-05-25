import { requireAuth } from "@/lib/auth/require-auth";
import GoalForm from "./_components/goalform";

export default async function GoalsPage() {
  await requireAuth();

  return (
    <div className="max-w-md mx-auto">
      <GoalForm />
    </div>
  );
}
