import { withAuth } from 'next-auth/middleware';

// Protect selected routes — redirect to /login if not authenticated
export default withAuth({
  pages: {
    signIn: '/login',
  },
});

// Define which routes to protect
export const config = {
  matcher: [
    '/user/:path*',
    '/admin/:path*',
    '/dashboard/:path*',
  ],
};
