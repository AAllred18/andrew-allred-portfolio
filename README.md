# Andrew Allred Portfolio

A modern full-stack portfolio built with Next.js App Router, Tailwind CSS, MongoDB Atlas, and single-admin authentication for Vercel deployment.

## Highlights
- Long-scrolling recruiter-friendly homepage
- Dynamic project detail pages
- Admin dashboard for create, edit, publish, unpublish, and delete flows
- Multi-select segmented filtering for Development, Analysis, and UX Design
- Search and sort support
- Contact form backed by MongoDB
- Dark mode toggle
- Vercel-friendly architecture

## Stack
- Next.js 15 App Router
- React 19
- Tailwind CSS v4
- MongoDB Atlas + Mongoose
- NextAuth credentials provider for a single admin
- Framer Motion for tasteful interaction

## Folder structure
- `app/` routes and pages
- `components/` reusable UI and admin pieces
- `lib/` auth, db, validation, and query helpers
- `models/` Mongoose models
- `scripts/seed.ts` example seed data

## Future upgrades
- Swap image URLs for S3, Cloudinary, or Vercel Blob
- Add rich markdown editor or MDX for project bodies
- Add analytics with Vercel Analytics or Plausible
- Wire contact form to Resend for email notifications
