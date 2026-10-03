import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] p-8 text-center shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <p className="section-kicker mb-4">404</p>
        <h1 className="text-4xl font-semibold tracking-[-0.08em] text-[var(--text)] sm:text-5xl">
          Looks like this page went offline.
        </h1>
        <p className="mt-4 text-base text-[var(--muted)]">
          The page you were looking for is unavailable or no longer exists.
        </p>
        <Link
          href="/"
          className="brand-button mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
