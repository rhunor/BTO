import { withAuth } from "next-auth/middleware";
// import { NextRequest } from "next/server";

// We don't need to define a custom Token interface here
// Next-auth already handles this internally

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Using the token as provided by next-auth
      if (req.nextUrl.pathname.startsWith("/admin")) return token?.role === "admin";
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin:path*", "/profile"] };