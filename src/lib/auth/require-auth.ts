import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/auth";

export async function requireAuth() {
  const cookieHeader = (await cookies()).toString();
  const authenticated = await isAuthenticated(cookieHeader);

  if (!authenticated) {
    redirect("/login");
  }
}
