export const dynamic = "force-dynamic";

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

declare module "next-auth" {
  interface User {
    firstName?: string;
    lastName?: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      role?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
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
      
          // Plain-text password comparison
          const passwordMatch = credentials.password === existingUser.password;
          
          if (!passwordMatch) {
            return null;
          }
      
          // Return a user object that conforms to the User interface
          return {
            id: String(existingUser.id),
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            role: existingUser.role || "user", // Include the role from the database
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
        // Only set these values during sign-in
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email as string,
          firstName: token.firstName as string | undefined,
          lastName: token.lastName as string | undefined,
          role: token.role as string | undefined,
        };
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};