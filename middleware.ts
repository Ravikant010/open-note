// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { isLoggedIn } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes (no authentication required)
  const publicRoutes = ['/login', '/signup', '/profile', "/"];

  // Check if the current route matches a dynamic public route
  const isPublicPostRoute = pathname.startsWith('/post/'); // Matches /post/:id

  // Check if the user is logged in
  const isAuthenticated = await isLoggedIn();

  // Redirect unauthenticated users to the login page
  if (!isAuthenticated && !publicRoutes.includes(pathname) && !isPublicPostRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to public routes or authenticated users
  return NextResponse.next();
}

// Match all routes except for API routes, static files, and assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};