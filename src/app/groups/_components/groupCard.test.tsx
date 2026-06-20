import { render, screen, waitFor } from "@testing-library/react";
import GroupCard from "./groupCard";
import { getMyGoal } from "@/lib/api/goals";
import { getMyGroup } from "@/lib/api/groups";

vi.mock("@/lib/api/goals");
vi.mock("@/lib/api/groups", () => ({
  getMyGroup: vi.fn(),
  getGroups: vi.fn().mockResolvedValue([]),
  getMyGroupUsers: vi.fn().mockResolvedValue([]),
  leaveGroup: vi.fn(),
  subscribeToGroupChanges: vi.fn(() => vi.fn()),
}));

describe("GroupCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("asks the user to create a goal before joining or creating groups", async () => {
    vi.mocked(getMyGroup).mockResolvedValue(null);
    vi.mocked(getMyGoal).mockResolvedValue(null);

    render(<GroupCard />);

    expect(screen.getByText("Loading group")).toBeInTheDocument();

    expect(await screen.findByText("No Goal Created!")).toBeInTheDocument();
    expect(screen.getByText("You need a goal before joining a group.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create a goal" })).toHaveAttribute("href", "/goals");
  });

  test("shows group creation and join options when the user has a goal and no group", async () => {
    vi.mocked(getMyGroup).mockResolvedValue(null);
    vi.mocked(getMyGoal).mockResolvedValue({
      title: "Run more",
      description: "Run three times every week",
      frequencyTarget: 3,
      creationDate: "2026-06-03",
    });

    render(<GroupCard />);

    expect(await screen.findByText("Create a group")).toBeInTheDocument();
    expect(screen.getByText("Join a group")).toBeInTheDocument();
  });

  test("passes the goal state to the current group card", async () => {
    vi.mocked(getMyGroup).mockResolvedValue({
      id: 1,
      groupName: "Morning runners",
    });
    vi.mocked(getMyGoal).mockResolvedValue({
      title: "Run more",
      frequencyTarget: 3,
      creationDate: "2026-06-03",
    });

    render(<GroupCard />);

    expect(await screen.findByText("Morning runners")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Leave group" })).toBeDisabled();
    });
  });
});
