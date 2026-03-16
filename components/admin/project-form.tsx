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
  published: false,
  status: 'draft'
};

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClassName =
  'w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-900/40';

export function ProjectForm({ initialValues, mode }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<any>(initialValues || emptyProject);
  const [saving, setSaving] = useState(false);
  const [skillsInput, setSkillsInput] = useState(
    (initialValues?.skills || emptyProject.skills).join(', ')
  );
  const [galleryImagesInput, setGalleryImagesInput] = useState(
  (initialValues?.galleryImages || emptyProject.galleryImages).join(', ')
);

  const endpoint = useMemo(
    () => (mode === 'create' ? '/api/projects' : `/api/projects/${initialValues._id}`),
    [initialValues, mode]
  );

  const update = (key: string, value: any) =>
    setForm((current: any) => ({ ...current, [key]: value }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      published: form.status === 'published'
    };

    try {
      const response = await fetch(endpoint, {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error('Project save failed:', data);
        alert(data?.error || 'Failed to save project.');
        return;
      }

      router.push('/admin');
    } catch (error) {
      console.error('Unexpected save error:', error);
      alert('Something went wrong while saving the project.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="glass rounded-3xl p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Project Basics
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Core project details used across cards, pages, and navigation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Project Title">
            <input
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Project title"
              className={inputClassName}
            />
          </Field>

          <Field label="Slug">
            <input
              value={form.slug}
              onChange={(e) => update('slug', e.target.value)}
              placeholder="project-slug"
              className={inputClassName}
            />
          </Field>

          <Field label="Role">
            <input
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              placeholder="Frontend Developer"
              className={inputClassName}
            />
          </Field>

          <Field label="Project Type">
            <input
              value={form.projectType}
              onChange={(e) => update('projectType', e.target.value)}
              placeholder="Web app, dashboard, client site..."
              className={inputClassName}
            />
          </Field>

          <Field label="Timeline">
            <input
              value={form.timeline}
              onChange={(e) => update('timeline', e.target.value)}
              placeholder="Spring 2025"
              className={inputClassName}
            />
          </Field>

          <Field label="Featured Image URL">
            <input
              value={form.featuredImage}
              onChange={(e) => update('featuredImage', e.target.value)}
              placeholder="/images/projects/example/cover.png"
              className={inputClassName}
            />
          </Field>
        </div>

        <div className="mt-6 space-y-6">
          <Field label="Short Summary">
            <textarea
              value={form.shortSummary}
              onChange={(e) => update('shortSummary', e.target.value)}
              placeholder="Short summary shown on cards and project previews"
              rows={3}
              className={inputClassName}
            />
          </Field>

          <Field label="Full Description">
            <textarea
              value={form.fullDescription}
              onChange={(e) => update('fullDescription', e.target.value)}
              placeholder="Longer overview of the project and its purpose"
              rows={5}
              className={inputClassName}
            />
          </Field>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Categories, Skills, and Publishing
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Control how the project is tagged and whether it appears publicly.
          </p>
        </div>

        <Field label="Categories">
          <div className="flex flex-wrap gap-3">
            {PROJECT_CATEGORIES.map((category) => {
              const active = (form.categories || []).includes(category);

              return (
                <button
                  type="button"
                  key={category}
                  onClick={() =>
                    update(
                      'categories',
                      active
                        ? (form.categories || []).filter((item: string) => item !== category)
                        : [...(form.categories || []), category]
                    )
                  }
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Field>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Field label="Project Status">
            <select
              value={form.status || 'draft'}
              onChange={(e) => update('status', e.target.value)}
              className={inputClassName}
            >
              <option value="draft">Draft</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Ready for Review</option>
              <option value="published">Published</option>
            </select>
          </Field>

          <Field label="Skills">
            <input
              value={skillsInput}
              onChange={(e) => {
                const value = e.target.value;
                setSkillsInput(value);

                update(
                  'skills',
                  value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                );
              }}
              placeholder="React, TypeScript, MongoDB"
              className={inputClassName}
            />
          </Field>
        </div>

        <div className="mt-6 flex flex-wrap gap-8 text-sm">
          <label className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Featured project
          </label>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Case Study Content
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            These fields power the full project detail page.
          </p>
        </div>

        <div className="space-y-6">
          <Field label="Problem">
            <textarea
              value={form.problem || ''}
              onChange={(e) => update('problem', e.target.value)}
              placeholder="What problem was this project solving?"
              rows={4}
              className={inputClassName}
            />
          </Field>

          <Field label="Approach">
            <textarea
              value={form.approach || ''}
              onChange={(e) => update('approach', e.target.value)}
              placeholder="How did you approach the work?"
              rows={4}
              className={inputClassName}
            />
          </Field>

          <Field label="Implementation">
            <textarea
              value={form.implementation || ''}
              onChange={(e) => update('implementation', e.target.value)}
              placeholder="What did you build or implement?"
              rows={4}
              className={inputClassName}
            />
          </Field>

          <Field label="Results">
            <textarea
              value={form.results || ''}
              onChange={(e) => update('results', e.target.value)}
              placeholder="What outcomes or impact came from the project?"
              rows={4}
              className={inputClassName}
            />
          </Field>

          <Field label="Lessons Learned">
            <textarea
              value={form.lessons || ''}
              onChange={(e) => update('lessons', e.target.value)}
              placeholder="What did you learn from the project?"
              rows={4}
              className={inputClassName}
            />
          </Field>
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Supporting Lists and Media
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add comma-separated lists for galleries, features, outcomes, and links.
          </p>
        </div>

        <div className="grid gap-6">
          <Field label="Gallery Images">
            <input
              value={galleryImagesInput}
              onChange={(e) => {
                const value = e.target.value;
                setGalleryImagesInput(value);

                update(
                  'galleryImages',
                  value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                );
              }}
              placeholder="/images/project/one.png, /images/project/two.gif"
              className={inputClassName}
            />
          </Field>

          <Field label="Outcomes">
            <input
              value={(form.outcomes || []).join(', ')}
              onChange={(e) =>
                update(
                  'outcomes',
                  e.target.value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Improved usability, launched MVP, increased engagement"
              className={inputClassName}
            />
          </Field>

          <Field label="Challenges">
            <input
              value={(form.challenges || []).join(', ')}
              onChange={(e) =>
                update(
                  'challenges',
                  e.target.value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Tight timeline, data inconsistencies, design constraints"
              className={inputClassName}
            />
          </Field>

          <Field label="Contributions">
            <input
              value={(form.contributions || []).join(', ')}
              onChange={(e) =>
                update(
                  'contributions',
                  e.target.value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
              placeholder="UI design, frontend development, analytics"
              className={inputClassName}
            />
          </Field>

          <Field label="Features">
            <input
              value={(form.features || []).join(', ')}
              onChange={(e) =>
                update(
                  'features',
                  e.target.value
                    .split(',')
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Search, filtering, dashboards, authentication"
              className={inputClassName}
            />
          </Field>

          <Field label="Links">
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
              placeholder="Live Site|https://..., GitHub|https://..."
              className={inputClassName}
            />
          </Field>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950"
        >
          {saving ? 'Saving...' : mode === 'create' ? 'Create project' : 'Update project'}
        </button>
      </div>
    </form>
  );
}