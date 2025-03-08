// app/api/admin/crypto-data/[userId]/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // In a production app, you would check if the user has admin privileges here
    
    // Get userId from route params
    const userId = parseInt((await params).userId);
    
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    
    // Check if user exists
    const userExists = await db.user.findUnique({
      where: { id: userId }
    });
    
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Get user's crypto data
    const cryptoData = await db.cryptoData.findUnique({
      where: { userId },
      include: {
        coinData: true,
        chartData: {
          orderBy: { date: 'asc' }
        }
      }
    });
    
    // If no data exists, return a default structure
    if (!cryptoData) {
      return NextResponse.json({
        walletBalance: 0,
        totalProfit: 0,
        totalLoss: 0,
        percentageEarned: 0,
        recurringRevenue: 0,
        notifications: 0,
        coinData: [
          { name: 'SOL', profitValue: 0, lossValue: 0, revenueValue: 0 },
          { name: 'BTC', profitValue: 0, lossValue: 0, revenueValue: 0 },
          { name: 'ETH', profitValue: 0, lossValue: 0, revenueValue: 0 },
          { name: 'SHIB', profitValue: 0, lossValue: 0, revenueValue: 0 },
          { name: 'USDT', profitValue: 0, lossValue: 0, revenueValue: 0 }
        ],
        chartData: []
      });
    }
    
    return NextResponse.json(cryptoData);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return NextResponse.json({ error: "Failed to fetch crypto data" }, { status: 500 });
  }
}