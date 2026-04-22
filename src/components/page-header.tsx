import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex"><Link href="/"> Super Cool TT Logo </Link></div>

      <div className="flex items-center gap-2">
        <Link href="/groups" className="flex items-center gap-2 border border-white/10 bg-white/5 p-1">
        Groups
        </Link>
        <Link href="/goals" className="flex items-center gap-2 border border-white/10 bg-white/5 p-1">
        Goals
        </Link>
        <Link href="/stakes" className="flex items-center gap-2 border border-white/10 bg-white/5 p-1">
        Stakes
        </Link>
        <Link href="/profile" className="flex items-center gap-2 border border-white/10 bg-white/5 p-1">
        Profile
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/login" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1"> Login </Link>
        <Link href="/signup" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1"> Sign Up</Link>
</div>
    </header>
  );
}