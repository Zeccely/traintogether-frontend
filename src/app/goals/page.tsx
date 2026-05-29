import { requireAuth } from "@/lib/auth/require-auth";
import GoalsContent from "./_components/goalsContentPage";

export default async function GoalsPage() {
  await requireAuth();

  return (
    <div className="max-w-md mx-auto">
      <GoalsContent />
    </div>
  );
}
