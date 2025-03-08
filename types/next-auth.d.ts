import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    firstName?: string
    lastName?: string
    role?: string
  }
  
  interface Session {
    user: {
      id: string
      email: string
      firstName?: string
      lastName?: string
      role?: string
    }
    token?: {
      email: string
      role?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    firstName?: string
    lastName?: string
    role?: string
  }
}