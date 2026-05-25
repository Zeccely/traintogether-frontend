import { requireAuth } from "@/lib/auth/require-auth";

export default async function StakesPage() {
  await requireAuth();

  return <div>Stakes page</div>;
}
