import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import MyGroupCard from "./myGroupCard";
import { getMyGroupUsers, leaveGroup, subscribeToGroupChanges } from "@/lib/api/groups";
import { playJoinSound } from "@/lib/audio/play-join-sound";
import { GroupChangeEvent } from "@/lib/types/group";

vi.mock("@/lib/audio/play-join-sound");
vi.mock("@/lib/api/groups");

const group = {
  id: 1,
  groupName: "Morning runners",
};

describe("MyGroupCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(subscribeToGroupChanges).mockReturnValue(vi.fn());
  });

  test("shows teammates in the current group", async () => {
    vi.mocked(getMyGroupUsers).mockResolvedValue([
      { username: "alex", name: "Alex Runner", groupId: 1, goalId: 3 },
      { username: "sam", name: "Sam Sprinter", groupId: 1 },
    ]);

    render(<MyGroupCard group={group} onLeft={() => {}} />);

    expect(await screen.findByText("Alex Runner")).toBeInTheDocument();
    expect(screen.getByText("alex")).toBeInTheDocument();
    expect(screen.getByText("Sam Sprinter")).toBeInTheDocument();
  });

  test("allows leaving the group so the user can delete their goal afterward", async () => {
    vi.mocked(getMyGroupUsers).mockResolvedValue([]);

    render(<MyGroupCard group={group} onLeft={() => {}} />);

    const leaveButton = screen.getByRole("button", { name: "Leave group" });

    expect(leaveButton).toBeEnabled();
    expect(await screen.findByText("No teammates yet.")).toBeInTheDocument();
  });

  test("leaves the group after confirmation", async () => {
    const onLeft = vi.fn();
    vi.mocked(getMyGroupUsers).mockResolvedValue([]);
    vi.mocked(leaveGroup).mockResolvedValue(undefined);

    render(<MyGroupCard group={group} onLeft={onLeft} />);

    fireEvent.click(screen.getByRole("button", { name: "Leave group" }));

    const dialog = screen.getByRole("dialog", { name: "Leave group?" });
    expect(
      within(dialog).getByText("Are you sure you want to leave Morning runners?"),
    ).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: "Leave" }));

    await waitFor(() => {
      expect(leaveGroup).toHaveBeenCalled();
      expect(onLeft).toHaveBeenCalled();
    });
  });

  test("plays the join sound and reloads teammates when someone joins this group", async () => {
    let onGroupChanged: ((event: GroupChangeEvent) => void) | undefined;
    vi.mocked(getMyGroupUsers)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ username: "alex", name: "Alex Runner", groupId: 1 }]);
    vi.mocked(subscribeToGroupChanges).mockImplementation((callback) => {
      onGroupChanged = callback;
      return vi.fn();
    });
    vi.mocked(playJoinSound).mockResolvedValue(undefined);

    render(<MyGroupCard group={group} onLeft={() => {}} />);

    expect(await screen.findByText("No teammates yet.")).toBeInTheDocument();

    onGroupChanged?.({ groupId: 1, type: "JOINED" });

    expect(await screen.findByText("Alex Runner")).toBeInTheDocument();
    expect(playJoinSound).toHaveBeenCalled();
    expect(getMyGroupUsers).toHaveBeenCalledTimes(2);
  });
});
