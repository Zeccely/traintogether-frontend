import { UserCreation, UserDetails } from "../types/user";

export async function createUser(input: UserCreation): Promise<void> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error((await res.text()) || `Failed to create user (${res.status})`);
  }
}

export async function getCurrentUserDetails(): Promise<UserDetails> {
  const response = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json();
}
