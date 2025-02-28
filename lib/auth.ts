// lib/auth.ts


// Mark this file as server-only
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ovo@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          return null;

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        
        if (!existingUser) {
          return null;
        }

        const passwordMatch = credentials.password === existingUser.password;

        if (!passwordMatch) {
          return null;
        }
        
        return {
          id: `${existingUser.id}`,
          email: existingUser.email
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          email: user.email
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email
        }
      };
    }
  },
  debug: process.env.NODE_ENV === "development",
};