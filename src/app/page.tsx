import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth/auth";
import WelcomePage from "./_components/welcomePage";

export default async function Home() {
  const cookieHeader = (await cookies()).toString();
  const isLoggedIn = await getIsLoggedIn(cookieHeader);

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return <WelcomePage />;
}

async function getIsLoggedIn(cookieHeader: string): Promise<boolean> {
  if (!cookieHeader) {
    return false;
  }

  try {
    return await isAuthenticated(cookieHeader);
  } catch {
    return false;
  }
}
