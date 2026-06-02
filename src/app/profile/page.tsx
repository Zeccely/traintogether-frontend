import { requireAuth } from "@/lib/auth/require-auth";
import BackToDashboardButton from "@/components/back-to-dashboard-button";

export default async function ProfilePage() {
  await requireAuth();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4">
      <BackToDashboardButton />
      <div>Profile page</div>
    </div>
  );
}
