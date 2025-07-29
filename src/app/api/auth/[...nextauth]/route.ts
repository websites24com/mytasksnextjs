// This is the Next.js 15+ App Router API route for NextAuth
// It uses the Credentials Provider (email + password)
// and a MySQL database with TypeScript and bcrypt

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';

import bcrypt from 'bcrypt';
import { db } from '@/app/lib/db';
import type { UserRow } from '@/app/lib/types';

// NextAuth configuration object
const authOptions: NextAuthOptions = {
  // Define the provider we use — Credentials (email/password)
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      // The fields expected from the client form
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // This function is called when a user tries to log in
      // It must return null if login fails or a user object if successful
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<User | null> {
        // Ensure credentials were provided
        if (!credentials?.email || !credentials?.password) return null;

        // Query the DB for a user with this email
        const [rows] = await db.query<UserRow[]>(
          'SELECT * FROM users WHERE email = ?',
          [credentials.email]
        );

        const user = rows[0]; // Get first user match

        // If no user found → reject login
        if (!user) return null;

        // Compare password with hash from DB
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // Return user data (must include `id` and `email`)
        return { id: user.id.toString(), email: user.email } as User;
      },
    }),
  ],

  // Use JWT (not database sessions)
  session: {
    strategy: 'jwt',
  },

  // Callbacks to add user.id to token and session
  callbacks: {
    // Runs when JWT token is created or updated
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;  // Save user ID into token
      }
      return token;
    },

    // Runs when session is created from JWT token
    async session({ session, token }: { session: Session; token: JWT }) {
      // Extend the session object with user ID from token
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // Custom sign-in page
  pages: {
    signIn: '/login',
  },
};

// Export the handler as GET and POST (required by App Router)
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
