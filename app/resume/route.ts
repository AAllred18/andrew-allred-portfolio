import { NextResponse } from 'next/server';

export function GET() {
  const resumeUrl = process.env.RESUME_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return NextResponse.redirect(resumeUrl);
}
