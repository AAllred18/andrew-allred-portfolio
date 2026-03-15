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

## Getting started
1. Install dependencies
   - `npm install`
2. Copy environment variables
   - `cp .env.example .env.local`
3. Add values for:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `NEXT_PUBLIC_SITE_URL`
4. Generate a bcrypt hash for your admin password:
   - `node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"`
5. Seed example projects:
   - `npm run seed`
6. Start locally:
   - `npm run dev`

## Vercel deployment
1. Push the repo to GitHub.
2. Import into Vercel.
3. Add all environment variables from `.env.local`.
4. Ensure your MongoDB Atlas network access allows Vercel connections.
5. Redeploy after any auth or environment updates.

## Content model
Projects support:
- title
- slug
- shortSummary
- fullDescription
- categories
- skills
- role
- projectType
- timeline
- featuredImage
- galleryImages
- outcomes
- challenges
- contributions
- problem
- approach
- implementation
- features
- results
- lessons
- links
- featured
- published

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
