import { withAuth } from "next-auth/middleware";

interface Token {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  createdAt: Date;
  updatedAt: Date;
  role?: string; // Add the 'role' property here
}

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }: { req: any; token: Token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) return token?.role === "admin";
      return !!token;
    },
  },
});
export const config = { matcher: ["/admin:path*", "/profile"] };
