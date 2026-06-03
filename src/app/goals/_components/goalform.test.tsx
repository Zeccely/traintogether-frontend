import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GoalForm from "./goalform";
import { createGoal } from "@/lib/api/goals";

vi.mock("@/lib/api/goals");

describe("GoalForm", () => {
  test("shows the goal form fields", () => {
    render(<GoalForm />);

    expect(screen.getByText("Make a Goal to Achieve!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Frequency Target")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Goal" })).toBeInTheDocument();
  });

  test("shows an error when the frequency target is empty", async () => {
    render(<GoalForm />);

    fireEvent.click(screen.getByRole("button", { name: "Create Goal" }));

    expect(await screen.findByText("Frequency target is required.")).toBeInTheDocument();
  });

  test("submits the goal details", async () => {
    vi.mocked(createGoal).mockResolvedValue({
      title: "Run more",
      description: "Run three times every week",
      frequencyTarget: 3,
      creationDate: "2026-06-03",
    });
    render(<GoalForm />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Run more" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Run three times every week" },
    });
    fireEvent.change(screen.getByPlaceholderText("Frequency Target"), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create Goal" }));

    await waitFor(() => {
      expect(createGoal).toHaveBeenCalledWith({
        title: "Run more",
        description: "Run three times every week",
        frequencyTarget: 3,
      });
    });
  });
});
