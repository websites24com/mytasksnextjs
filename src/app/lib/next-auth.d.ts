// app/lib/next-auth.d.ts



declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // string because token.id is string
      email: string;
    };
  }

  interface User {
    id: string;
    email: string;
  }
}
