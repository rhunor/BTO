// lib/auth.ts
export const dynamic = "force-dynamic";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ovo@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const existingUser = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            return null;
          }

          // Plain-text password comparison (unchanged as per your request)
          const passwordMatch = credentials.password === existingUser.password;

          if (!passwordMatch) {
            return null;
          }

          return {
            id: `${existingUser.id}`,
            email: existingUser.email,
          };
        } catch (error) {
          console.error("Database error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Initial sign-in: populate token
        token.id = Number(user.id);
        token.email = user.email;
      }

      // Validate token against database on every request
      const dbUser = await db.user.findUnique({
        where: { id: Number(token.id) },
      });

      if (!dbUser) {
        // Invalidate token if user no longer exists
        return null;
      }

      // Ensure token data matches database
      token.email = dbUser.email;
      return token;
    },
    async session({ session, token }) {
      if (token && token.id && token.email) {
        // Update session with validated token data
        session.user = {
          ...session.user,
          id: String(token.id),
          email: token.email,
        };
      } else {
        // Clear session if token is invalid
        session.user = null;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};