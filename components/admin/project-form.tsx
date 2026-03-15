'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECT_CATEGORIES } from '@/lib/constants';

type ProjectFormProps = {
  initialValues?: any;
  mode: 'create' | 'edit';
};

const emptyProject = {
  title: '',
  slug: '',
  shortSummary: '',
  fullDescription: '',
  categories: ['Development'],
  skills: ['React'],
  role: '',
  projectType: '',
  timeline: '',
  featuredImage: '',
  galleryImages: [],
  outcomes: [],
  challenges: [],
  contributions: [],
  problem: '',
  approach: '',
  implementation: '',
  features: [],
  results: '',
  lessons: '',
  links: [],
  featured: false,
  published: false
};

export function ProjectForm({ initialValues, mode }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<any>(initialValues || emptyProject);
  const [saving, setSaving] = useState(false);

  const endpoint = useMemo(
    () => (mode === 'create' ? '/api/projects' : `/api/projects/${initialValues._id}`),
    [initialValues, mode]
  );

  const update = (key: string, value: any) => setForm((current: any) => ({ ...current, [key]: value }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const response = await fetch(endpoint, {
      method: mode === 'create' ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setSaving(false);
    if (response.ok) router.push('/admin');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="glass rounded-3xl p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Project title" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <input value={form.slug} onChange={(e) => update('slug', e.target.value)} placeholder="slug" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <input value={form.role} onChange={(e) => update('role', e.target.value)} placeholder="Role" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <input value={form.projectType} onChange={(e) => update('projectType', e.target.value)} placeholder="Project type" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <input value={form.timeline} onChange={(e) => update('timeline', e.target.value)} placeholder="Timeline" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
          <input value={form.featuredImage} onChange={(e) => update('featuredImage', e.target.value)} placeholder="Featured image URL" className="rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
        </div>
        <textarea value={form.shortSummary} onChange={(e) => update('shortSummary', e.target.value)} placeholder="Short summary" rows={3} className="mt-4 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
        <textarea value={form.fullDescription} onChange={(e) => update('fullDescription', e.target.value)} placeholder="Full description" rows={5} className="mt-4 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
      </section>

      <section className="glass rounded-3xl p-6">
        <h3 className="text-lg font-semibold">Categories, tags, and publishing</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {PROJECT_CATEGORIES.map((category) => {
            const active = form.categories.includes(category);
            return (
              <button
                type="button"
                key={category}
                onClick={() => update('categories', active ? form.categories.filter((item: string) => item !== category) : [...form.categories, category])}
                className={`rounded-full px-4 py-2 text-sm ${active ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-900'}`}
              >
                {category}
              </button>
            );
          })}
        </div>
        <input value={form.skills.join(', ')} onChange={(e) => update('skills', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} placeholder="Skills, comma separated" className="mt-4 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700" />
        <div className="mt-4 flex flex-wrap gap-6 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} /> Featured</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => update('published', e.target.checked)} /> Published</label>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h3 className="text-lg font-semibold">Case study content</h3>
        {['problem', 'approach', 'implementation', 'results', 'lessons'].map((field) => (
          <textarea
            key={field}
            value={form[field] || ''}
            onChange={(e) => update(field, e.target.value)}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            rows={4}
            className="mt-4 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
          />
        ))}
        {['galleryImages', 'outcomes', 'challenges', 'contributions', 'features'].map((field) => (
          <input
            key={field}
            value={(form[field] || []).join(', ')}
            onChange={(e) => update(field, e.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
            placeholder={`${field} (comma separated)`}
            className="mt-4 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
          />
        ))}
        <input
          value={(form.links || []).map((link: any) => `${link.label}|${link.url}`).join(', ')}
          onChange={(e) =>
            update(
              'links',
              e.target.value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean)
                .map((item) => {
                  const [label, url] = item.split('|');
                  return { label: label?.trim(), url: url?.trim() };
                })
            )
          }
          placeholder="Links as Label|URL, Label|URL"
          className="mt-4 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-700"
        />
      </section>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => router.push('/admin')} className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium dark:border-slate-700">Cancel</button>
        <button type="submit" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950">
          {saving ? 'Saving...' : mode === 'create' ? 'Create project' : 'Update project'}
        </button>
      </div>
    </form>
  );
}
