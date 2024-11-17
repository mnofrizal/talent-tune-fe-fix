import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the user is authenticated and tries to access login page,
    // redirect them to dashboard
    if (req.nextUrl.pathname.startsWith("/login") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes that don't require authentication
        if (
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname === "/"
        ) {
          return true;
        }
        // Protected routes that require authentication
        return !!token;
      },
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
