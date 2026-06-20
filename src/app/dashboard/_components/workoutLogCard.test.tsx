import { render, screen, waitFor } from "@testing-library/react";
import WorkoutLogCard from "./workoutLogCard";
import { getMyGoal } from "@/lib/api/goals";
import {
  getMyGoalProgress,
  getMyGoalProgressForCurrentWeek,
  isTodaysWorkoutLogged,
} from "@/lib/api/goalProgress";

vi.mock("@/lib/api/goals");
vi.mock("@/lib/api/goalProgress");

describe("WorkoutLogCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("skips workout progress requests when the user has no goal", async () => {
    vi.mocked(getMyGoal).mockResolvedValue(null);

    render(<WorkoutLogCard />);

    const button = screen.getByRole("button", { name: "Create a goal first" });
    expect(button).toBeDisabled();

    await waitFor(() => expect(getMyGoal).toHaveBeenCalled());
    expect(isTodaysWorkoutLogged).not.toHaveBeenCalled();
    expect(getMyGoalProgress).not.toHaveBeenCalled();
    expect(getMyGoalProgressForCurrentWeek).not.toHaveBeenCalled();
  });
});
