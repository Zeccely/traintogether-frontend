import { requireAuth } from "@/lib/auth/require-auth";
import StakesContent from "./_components/stakesContentPage";

export default async function StakesPage() {
  await requireAuth();

  return (
    <div className="max-w-md mx-auto mt-10">
      <StakesContent />
    </div>
  );
}
