import { User, UserCreation } from "../types/user";

export async function createUser(input: UserCreation): Promise<User> {
  const res = await fetch(`http://localhost:8080/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to create User");
  }

  return res.json();
}
