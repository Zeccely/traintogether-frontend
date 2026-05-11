import CalendarView from "./_components/calendarView";
import GoalsCard from "./_components/goalsCard";
import UserCard from "./_components/userCard";

export default function DashboardPage() {
  return (
    <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-4 px-4 md:flex-row">
      <div className="flex w-full flex-col gap-4 md:w-80">
        <UserCard />
        <div> Space for something else</div>
        <div className="mt-auto">
          <GoalsCard />
        </div>
      </div>
      <div className="flex-1">
        <CalendarView />
      </div>
    </div>
  );
}
