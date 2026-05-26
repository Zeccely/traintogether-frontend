import Link from "next/link";
import { cookies } from "next/headers";
import HeaderAuthActions from "./header-auth-actions";

export default async function PageHeader() {
  const isLoggedIn = (await cookies()).has("ACCESS");

  return (
    <header className="flex h-[74px] items-center justify-between border-b border-border bg-background px-6">
      <div className="flex min-w-0 flex-1">
        <Link href="/dashboard"> Super Cool TT Logo </Link>
      </div>
      <div className="flex items-center justify-center gap-10">
        <Link
          href="/groups"
          className="flex h-[74px] items-center border-b-2 border-transparent px-1"
        >
          Groups
        </Link>
        <Link
          href="/goals"
          className="flex h-[74px] items-center border-b-2 border-transparent px-1"
        >
          Goals
        </Link>
        <Link
          href="/stakes"
          className="flex h-[74px] items-center border-b-2 border-transparent px-1"
        >
          Stakes
        </Link>
        <Link
          href="/profile"
          className="flex h-[74px] items-center border-b-2 border-transparent px-1"
        >
          Profile
        </Link>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-8">
        <HeaderAuthActions key={isLoggedIn ? "logged-in" : "logged-out"} isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
