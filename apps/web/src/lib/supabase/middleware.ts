import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@barangay/shared';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes configuration
  const protectedRoutes = ['/user_dashboard', '/admin_dashboard', '/moderator_dashboard', '/profile', '/concerns', '/suggestions', '/admin'];
  const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // TODO: Re-enable auth protection when Supabase auth is fully implemented
  // For now, allow mock authentication via localStorage (checked client-side)
  // Uncomment the block below to enforce Supabase auth:
  /*
  if (!user && isProtectedRoute) {
    // Redirect to login if trying to access protected route without auth
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  */

  if (user && isAuthRoute) {
    // Redirect to dashboard if already logged in and trying to access auth routes
    const url = request.nextUrl.clone();
    url.pathname = '/user_dashboard';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
