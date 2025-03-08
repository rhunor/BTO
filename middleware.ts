import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export default withAuth(
  // Middleware function
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const pathname = req.nextUrl.pathname;

    

    // Handle admin routes
    if (pathname.startsWith("/admin")) {
      // Check if token exists and role is admin
      if (!token || token.role !== "admin") {
        // Redirect to signin page or unauthorized page
        return NextResponse.redirect(new URL("/signin", req.url));
      }
    }

    // Allow request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow access to non-admin routes if user is authenticated
        if (!req.nextUrl.pathname.startsWith("/admin")) {
          return !!token;
        }
        
        // For admin routes, require admin role
        return token?.role === "admin";
      },
    },
    pages: {
      signIn: "/signin", // Redirect here when unauthorized
    },
  }
);

// Config to specify which routes to protect
export const config = {
  matcher: [
    "/admin/:path*", // Protect all admin routes
    // Add other protected routes here if needed
  ],
};