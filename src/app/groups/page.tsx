import { requireAuth } from "@/lib/auth/require-auth";

export default async function GroupsPage() {
  await requireAuth();

  return <div>Groups page</div>;
}
