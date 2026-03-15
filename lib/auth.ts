import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) return null;

  const adminEmail = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  console.log('typed email:', credentials.email);
  console.log('env email:', adminEmail);
  console.log('has password hash:', !!passwordHash);

  if (!adminEmail || !passwordHash) {
    throw new Error('Missing admin auth environment variables');
  }

  const emailMatches = credentials.email.toLowerCase().trim() === adminEmail.toLowerCase().trim();
  const passwordMatches = await bcrypt.compare(credentials.password, passwordHash);

  console.log('email matches:', emailMatches);
  console.log('password matches:', passwordMatches);

  if (!emailMatches || !passwordMatches) return null;

  return {
    id: 'single-admin',
    email: adminEmail,
    name: 'Andrew Allred'
  };
}
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = 'admin';
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    }
  }
};
