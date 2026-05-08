import { LoginInput } from "../types/user";

export async function login(input: LoginInput): Promise<void> {
  const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }
}
