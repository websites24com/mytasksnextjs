import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { getUserByEmail, validatePassword } from '@/lib/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 🔍 Get user from DB
        const user = await getUserByEmail(credentials.email);
        if (!user) return null;

        // 🔐 Check password
        const isValid = await validatePassword(credentials.password, user.password);
        if (!isValid) return null;

        // ✅ Return user data for session & JWT
        return {
          id: user.id.toString(),
          email: user.email,
          first_name: user.first_name,
          second_name: user.second_name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.first_name = user.first_name;
        token.second_name = user.second_name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.first_name = token.first_name ?? null;
        session.user.second_name = token.second_name ?? null;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Optional: create your own login page at /login
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
