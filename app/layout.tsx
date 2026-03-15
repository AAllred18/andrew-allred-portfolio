import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Andrew Allred | Full-Stack Developer, UX Designer, Analyst',
    template: '%s | Andrew Allred'
  },
  description:
    'Portfolio of Andrew Allred, a BYU Information Systems student focused on full-stack development, UX design, accessibility, and data-informed problem solving.',
  openGraph: {
    title: 'Andrew Allred Portfolio',
    description:
      'Full-stack development, UX design, and analytical problem solving for polished digital products.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
