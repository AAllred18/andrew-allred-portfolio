import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="section-shell py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-slate-500">That project or route doesn’t exist.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950">
        Back home
      </Link>
    </main>
  );
}
