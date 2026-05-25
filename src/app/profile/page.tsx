import { requireAuth } from "@/lib/auth/require-auth";

export default async function ProfilePage() {
  await requireAuth();

  return <div>Profile page</div>;
}
