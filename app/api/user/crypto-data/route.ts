// app/api/user/crypto-data/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { formatCryptoData } from "@/lib/formatCryptoData";

// GET - Fetch user's crypto data
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // user IDs are stored as strings (Mongo ObjectId string)
    const userId = session.user.id as string;
    
    // Get user crypto data
    let userData = await db.cryptoData.findUnique({
      where: { userId },
      include: {
        coinData: true,
        chartData: {
          orderBy: { date: 'asc' }
        }
      }
    });
    
    // If no data exists yet, create default data for the user
    if (!userData) {
      userData = await createDefaultCryptoData(userId);
    }
    
  // Format the data for the frontend
  const formattedData = formatCryptoData(userData);

  return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return NextResponse.json({ error: "Failed to fetch crypto data" }, { status: 500 });
  }
}

// Helper function to create default crypto data for a new user
async function createDefaultCryptoData(userId: string) {
  // Create the base crypto data record
  const cryptoData = await db.cryptoData.create({
    data: {
      userId,
      walletBalance: 0,
      totalProfit: 0,
      totalLoss: 0,
      percentageEarned: 0,
      recurringRevenue: 0,
      notifications: 0,
      
      // Default change values
      walletBalanceChange: 0,
      walletBalanceChangeType: "positive",
      totalProfitChange: 0,
      totalProfitChangeType: "positive",
      totalLossChange: 0,
      totalLossChangeType: "negative",
      percentageEarnedChange: 0,
      percentageEarnedChangeType: "positive",
      recurringRevenueChange: 0,
      recurringRevenueChangeType: "positive",
      
      // Add default coin data
      coinData: {
        createMany: {
          data: [
            { name: 'SOL', profitValue: 0, lossValue: 0, revenueValue: 0 },
            { name: 'BTC', profitValue: 0, lossValue: 0, revenueValue: 0 },
            { name: 'ETH', profitValue: 0, lossValue: 0, revenueValue: 0 },
            { name: 'SHIB', profitValue: 0, lossValue: 0, revenueValue: 0 },
            { name: 'USDT', profitValue: 0, lossValue: 0, revenueValue: 0 }
          ]
        }
      },
      
      // Add default chart data (past 5 months)
      chartData: {
        createMany: {
          data: generateDefaultChartData(),
        }
      }
    },
    include: {
      coinData: true,
      chartData: {
        orderBy: { date: 'asc' }
      }
    }
  });
  
  return cryptoData;
}

// Generate default chart data for the past 5 months with zero values
function generateDefaultChartData() {
  const data = [];
  const today = new Date();
  
  for (let i = 4; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    data.push({
      date,
      sol: 0,
      btc: 0,
      eth: 0,
      shib: 0,
      usdt: 0
    });
  }
  
  return data;
}