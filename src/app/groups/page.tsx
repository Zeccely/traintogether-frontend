import { requireAuth } from "@/lib/auth/require-auth";
import BackToDashboardButton from "@/components/back-to-dashboard-button";
import GroupCard from "./_components/groupCard";

export default async function GroupsPage() {
  await requireAuth();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4">
      <BackToDashboardButton />
      <GroupCard />
    </div>
  );
}
