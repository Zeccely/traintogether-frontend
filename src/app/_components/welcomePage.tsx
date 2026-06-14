export default function WelcomePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Welcome to TrainTogether</h1>
      <p className="text-muted-foreground">
        Set workout goals, join a group, and keep each other accountable.
      </p>
      <div className="flex gap-3">
        <a href="/signup" className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
          Get started
        </a>
        <a href="/login" className="rounded-lg border border-border px-4 py-2">
          Log in
        </a>
      </div>
    </div>
  );
}
