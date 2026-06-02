import { requireAuth } from "@/lib/auth/require-auth";
import BackToDashboardButton from "@/components/back-to-dashboard-button";
import StakesContent from "./_components/stakesContentPage";

export default async function StakesPage() {
  await requireAuth();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4">
      <BackToDashboardButton />
      <StakesContent />
    </div>
  );
}
