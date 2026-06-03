import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./loginform";
import { login } from "@/lib/auth/auth";

vi.mock("@/lib/auth/auth");

describe("LoginForm", () => {
  test("shows the login form fields", () => {
    render(<LoginForm />);

    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  test("attempts to log in a user when form is filled out", async () => {
    const fakeUser = {
      username: "testuser",
      passwordInput: "testpassword",
    };

    vi.mocked(login).mockResolvedValue(undefined);
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: fakeUser.username },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: fakeUser.passwordInput },
    });
    fireEvent.click(screen.getByRole("button", { name: "Log in" }));
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(fakeUser);
    });
  });
});
