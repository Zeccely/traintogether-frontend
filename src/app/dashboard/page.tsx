import { requireAuth } from "@/lib/auth/require-auth";
import GoalsCard from "./_components/goalsCard";
import UserCard from "./_components/userCard";
import WorkoutLogCard from "./_components/workoutLogCard";

export default async function DashboardPage() {
  await requireAuth();

  return (
    <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-4 px-4 md:flex-row">
      <div className="flex w-full flex-col gap-4 md:w-80 md:justify-between">
        <UserCard />
        <GoalsCard />
      </div>
      <div className="flex-1">
        <WorkoutLogCard />
      </div>
    </div>
  );
}
