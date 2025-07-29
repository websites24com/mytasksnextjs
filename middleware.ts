// middleware.ts
import { withAuth } from 'next-auth/middleware';

// This wraps the middleware with session checking
export default withAuth({
  // If not authenticated, redirect here:
  pages: {
    signIn: '/login',
  },
});

// This tells Next.js which routes to apply the middleware to
export const config = {
  matcher: ['/user'], // 👈 add more paths if needed
};
