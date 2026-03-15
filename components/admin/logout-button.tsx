'use client';

import { signOut } from 'next-auth/react';

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="rounded-full border border-rose-200 px-5 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-500/10"
    >
      Logout
    </button>
  );
}