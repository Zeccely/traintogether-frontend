import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GroupCreateCard from "./groupCreateCard";
import { createGroup } from "@/lib/api/groups";

vi.mock("@/lib/api/groups");

describe("GroupCreateCard", () => {
  test("shows the group create form fields", () => {
    render(<GroupCreateCard onCreated={() => {}} onError={() => {}} />);

    expect(screen.getByText("Create a group")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Group name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create group" })).toBeInTheDocument();
  });

  test("creates a group", async () => {
    const createdGroup = {
      id: 1,
      groupName: "Morning runners",
    };
    vi.mocked(createGroup).mockResolvedValue(createdGroup);
    const onCreated = vi.fn();

    render(<GroupCreateCard onCreated={onCreated} onError={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("Group name"), {
      target: { value: "Morning runners" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create group" }));

    await waitFor(() => {
      expect(createGroup).toHaveBeenCalledWith({
        groupName: "Morning runners",
      });
      expect(onCreated).toHaveBeenCalledWith(createdGroup);
    });
  });

  test("shows an error when a group cannot be created", async () => {
    vi.mocked(createGroup).mockRejectedValue(new Error("user must have a goal"));
    const onCreated = vi.fn();
    const onError = vi.fn();

    render(<GroupCreateCard onCreated={onCreated} onError={onError} />);

    fireEvent.change(screen.getByPlaceholderText("Group name"), {
      target: { value: "Morning runners" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create group" }));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith("user must have a goal");
      expect(onCreated).not.toHaveBeenCalled();
    });
  });
});
