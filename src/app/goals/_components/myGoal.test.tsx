import { render, screen } from "@testing-library/react";
import MyGoal from "./myGoal";

const goal = {
  title: "Run more",
  description: "Run three times every week",
  frequencyTarget: 3,
  creationDate: "2026-06-03",
};

describe("MyGoal", () => {
  test("disables goal deletion while the user is in a group", () => {
    render(<MyGoal goal={goal} isInGroup onDeleted={() => {}} />);

    const deleteButton = screen.getByRole("button", { name: "Delete goal" });

    expect(deleteButton).toBeDisabled();
    expect(deleteButton).toHaveAttribute(
      "title",
      "Leave your group before deleting your goal",
    );
  });

  test("allows goal deletion after the user has left their group", () => {
    render(<MyGoal goal={goal} isInGroup={false} onDeleted={() => {}} />);

    expect(screen.getByRole("button", { name: "Delete goal" })).toBeEnabled();
  });
});
