// import { NextAuthOptions } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
// import { redirect, useRouter } from "next/navigation";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { isAbsolute } from "path";
import { Session } from "inspector";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy:"jwt"
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
         
            if (!credentials?.email  || !credentials?.password)
            return null;
  
          const existingUser = await db.user.findUnique({
            where: { email: credentials?.email },
          });
          if(!existingUser){
            return null;
          }
          const passwordMatch = credentials.password === existingUser.password;

          if(!passwordMatch){
            return null
          }
          return{
            id: `${existingUser.id}`,
            email: existingUser.email
          }

          }
        })
      ],
      callbacks: {
        async jwt({ token, user }){
            // console.log(token, user);
            if (user) {
                return{
                    ...token,
                    email: user.email
                }
                
            }
            return token
        },
        async session({ session, user, token }){
            return{
                ...session,
                user:{
                    ...session.user,
                    email: token.email
                }
            }
            return session
        },
    }
}

// export async function loginIsRequiredServer() {
//     const session = await getServerSession(authConfig);
//     if (!session) return redirect("/");
//   }
  
//   export function loginIsRequiredClient() {
//     if (typeof window !== "undefined") {
//       const session = useSession();
//       const router = useRouter();
//       if (!session) router.push("/");
//     }
//   }

// try {
  
// } catch (error) {
  
// }