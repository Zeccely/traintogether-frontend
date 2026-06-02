import { requireAuth } from "@/lib/auth/require-auth";
import BackToDashboardButton from "@/components/back-to-dashboard-button";
import GoalsContent from "./_components/goalsContentPage";

export default async function GoalsPage() {
  await requireAuth();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4">
      <BackToDashboardButton />
      <GoalsContent />
    </div>
  );
}
