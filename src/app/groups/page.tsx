import { requireAuth } from "@/lib/auth/require-auth";
import GroupCard from "./_components/groupCard";

export default async function GroupsPage() {
  await requireAuth();

  return (
    <div className="max-w-md mx-auto">
      <GroupCard />
    </div>
  );
}
