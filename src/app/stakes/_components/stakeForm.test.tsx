import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import StakeForm from "./stakeForm";
import { updateMyGroupStake } from "@/lib/api/stakes";

vi.mock("@/lib/api/stakes");

//groups related tests under a readable label
describe("StakeForm", () => {
  test("shows the group stake heading", () => {
    render(<StakeForm onSaved={() => {}} />);
    expect(screen.getByText("Group stake")).toBeInTheDocument();
  });

  test("shows a stake description input", () => {
    render(<StakeForm onSaved={() => {}} />);
    expect(screen.getByPlaceholderText("Stake description")).toBeInTheDocument();
  });

  test("shows an error when the description is empty", async () => {
    render(<StakeForm onSaved={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Save stake" }));
    expect(await screen.findByText("Stake description is required.")).toBeInTheDocument();
  });

  test("calls onCancel when cancel is clicked", () => {
    const onCancel = vi.fn();
    render(<StakeForm onSaved={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onCancel).toHaveBeenCalled();
  });

  test("submits the description and calls onSaved", async () => {
    const savedStake = {
      id: 1,
      groupId: 1,
      description: "Run 5 km",
    };
    vi.mocked(updateMyGroupStake).mockResolvedValue(savedStake);
    const onSaved = vi.fn();
    render(<StakeForm onSaved={onSaved} />); //onsaved is a spy and the form is placed on render and then the spy is passed in the form
    fireEvent.change(screen.getByPlaceholderText("Stake description"), {
      target: { value: "Run 5 km" }, //fakes user entering test
    });
    fireEvent.click(screen.getByRole("button", { name: "Save stake" })); //triggers validation and submits the form
    await waitFor(() => {
      expect(onSaved).toHaveBeenCalledWith(savedStake);
      expect(updateMyGroupStake).toHaveBeenCalledWith({
        description: "Run 5 km", //checks if it was called and got this result
      });
    });
  });
});
