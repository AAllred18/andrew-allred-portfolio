'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
      callbackUrl
    });

    if (result?.error) {
      setError('Invalid credentials');
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <main className="section-shell flex min-h-screen items-center justify-center py-12">
      <form onSubmit={handleSubmit} className="glass w-full max-w-md rounded-[2rem] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Secure admin</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Sign in</h1>

        <div className="mt-6 space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <input name="password" type="password" placeholder="Password" className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
        </div>

        {error ? <p className="mt-3 text-sm text-rose-500">{error}</p> : null}

        <button className="mt-6 w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950">
          Log in
        </button>
      </form>
    </main>
  );
}