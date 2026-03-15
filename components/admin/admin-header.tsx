'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export function AdminHeader() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Admin CMS
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Projects Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your portfolio projects and content.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          View site
        </Link>

        <Link
          href="/admin/projects/new"
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
        >
          New project
        </Link>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-500/10"
        >
          Logout
        </button>
      </div>
    </div>
  );
}