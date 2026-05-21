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

export async function getCurrentUser(): Promise<string> {
  const response = await fetch("http://localhost:8080/api/auth/me", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Not logged in");
  }

  return response.text();
}

export async function isAuthenticated(cookieHeader: string): Promise<boolean> {
  const response = await fetch("http://localhost:8080/api/auth/me", {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  return response.ok;
}
//this feels wrong
