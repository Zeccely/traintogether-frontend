import Link from "next/link";
import { cookies } from "next/headers";
import HeaderAuthActions from "./header-auth-actions";

export default async function PageHeader() {
  const isLoggedIn = (await cookies()).has("ACCESS");

  return (
    <header className="flex items-center justify-between">
      <div className="flex">
        <Link href="/dashboard"> Super Cool TT Logo </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/groups"
          className="flex items-center gap-2 border border-white/10 bg-white/5 p-1"
        >
          Groups
        </Link>
        <Link
          href="/goals"
          className="flex items-center gap-2 border border-white/10 bg-white/5 p-1"
        >
          Goals
        </Link>
        <Link
          href="/stakes"
          className="flex items-center gap-2 border border-white/10 bg-white/5 p-1"
        >
          Stakes
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 border border-white/10 bg-white/5 p-1"
        >
          Profile
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <HeaderAuthActions isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
