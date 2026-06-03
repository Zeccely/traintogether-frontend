import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpForm from "./signupform";
import { createUser } from "@/lib/api/users";

vi.mock("@/lib/api/users");

describe("SignUpForm", () => {
  test("shows the signup heading", () => {
    render(<SignUpForm />);
    expect(screen.getAllByText("Sign Up")[0]).toBeInTheDocument();
  });

  test("shows the signup input fields", () => {
    render(<SignUpForm />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("What do you want to be called?")).toBeInTheDocument();
  });

  test("creates a user when the form is filled out", async () => {
    const fakeUser = {
      username: "testuser",
      passwordInput: "testpassword",
      desiredName: "Test User",
    };

    vi.mocked(createUser).mockResolvedValue(undefined);
    render(<SignUpForm />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: fakeUser.username },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: fakeUser.passwordInput },
    });
    fireEvent.change(screen.getByPlaceholderText("What do you want to be called?"), {
      target: { value: fakeUser.desiredName },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith(fakeUser);
    });
  });
});
