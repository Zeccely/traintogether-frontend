import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GroupJoinCard from "./groupJoinCard";
import { getGroups, joinGroup } from "@/lib/api/groups";

vi.mock("@/lib/api/groups");

describe("GroupJoinCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows available groups", async () => {
    vi.mocked(getGroups).mockResolvedValue([
      { id: 1, groupName: "Morning runners" },
      { id: 2, groupName: "Evening lifters" },
    ]);

    render(<GroupJoinCard onJoined={() => {}} />);

    expect(await screen.findByText("Morning runners")).toBeInTheDocument();
    expect(screen.getByText("Evening lifters")).toBeInTheDocument();
  });

  test("shows an empty state when there are no groups to join", async () => {
    vi.mocked(getGroups).mockResolvedValue([]);

    render(<GroupJoinCard onJoined={() => {}} />);

    expect(await screen.findByText("No groups available.")).toBeInTheDocument();
  });

  test("joins a selected group", async () => {
    const joinedGroup = { id: 1, groupName: "Morning runners" };
    const onJoined = vi.fn();
    vi.mocked(getGroups).mockResolvedValue([joinedGroup]);
    vi.mocked(joinGroup).mockResolvedValue(joinedGroup);

    render(<GroupJoinCard onJoined={onJoined} />);

    await screen.findByText("Morning runners");
    fireEvent.click(screen.getByRole("button", { name: "Join" }));

    await waitFor(() => {
      expect(joinGroup).toHaveBeenCalledWith(1);
      expect(onJoined).toHaveBeenCalledWith(joinedGroup);
    });
  });

  test("shows an error when joining fails", async () => {
    vi.mocked(getGroups).mockResolvedValue([{ id: 1, groupName: "Morning runners" }]);
    vi.mocked(joinGroup).mockRejectedValue(new Error("Group is full"));

    render(<GroupJoinCard onJoined={() => {}} />);

    await screen.findByText("Morning runners");
    fireEvent.click(screen.getByRole("button", { name: "Join" }));

    expect(await screen.findByText("Group is full")).toBeInTheDocument();
  });
});
