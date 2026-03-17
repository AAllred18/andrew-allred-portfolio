'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setStatus('loading');

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass space-y-4 rounded-3xl p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-700"
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-700"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Tell me what you're building or hiring for"
          rows={6}
          className="w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 outline-none dark:border-slate-700"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send message'}
        </button>

        <p className="text-sm text-slate-500">
          {status === 'success' && 'Message received. Thanks for reaching out.'}
          {status === 'error' && 'Something went wrong. Please try again.'}
        </p>
      </div>
    </form>
  );
}