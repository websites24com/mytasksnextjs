import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      first_name: string | null;
      second_name: string | null;
      role: 'USER' | 'ADMIN';
    };
  }

  interface User {
    id: string;
    email: string;
    first_name: string | null;
    second_name: string | null;
    role: 'USER' | 'ADMIN';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    first_name: string | null;
    second_name: string | null;
    role: 'USER' | 'ADMIN';
  }
}
