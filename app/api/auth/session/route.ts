// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({ 
      authenticated: !!session,
      user: session?.user || null
    });
  } catch (error) {
    console.error("Error checking session:", error);
    return NextResponse.json({ 
      authenticated: false,
      error: "Failed to check authentication status" 
    }, { status: 500 });
  }
}