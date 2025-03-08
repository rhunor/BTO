// app/api/user/crypto-data/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET - Fetch user's crypto data
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = parseInt(session.user.id);
    
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
async function createDefaultCryptoData(userId: number) {
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

// Format crypto data from database to frontend format
function formatCryptoData(userData: any) {
  // Get coin icons
  const coinIcons: Record<string, string> = {
    'SOL': '🔵',
    'BTC': '🟠',
    'ETH': '🟣',
    'SHIB': '🟡',
    'USDT': '🟢',
  };
  
  // Format profits by coin
  const profitsByCoin = userData.coinData.map((coin: any) => ({
    name: coin.name,
    value: coin.profitValue,
    icon: coinIcons[coin.name] || '💰'
  }));
  
  // Format losses by coin
  const lossesByCoin = userData.coinData
    .filter((coin: any) => coin.lossValue > 0)
    .map((coin: any) => ({
      name: coin.name,
      value: coin.lossValue,
      icon: coinIcons[coin.name] || '💰'
    }));
  
  // Format revenue by coin
  const revenueByCoin = userData.coinData.map((coin: any) => ({
    name: coin.name,
    value: coin.revenueValue,
    icon: coinIcons[coin.name] || '💰'
  }));
  
  // Format chart data
  const chartData = userData.chartData.map((entry: any) => {
    return {
      date: entry.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      SOL: entry.sol || 0,
      BTC: entry.btc || 0,
      ETH: entry.eth || 0,
      SHIB: entry.shib || 0,
      USDT: entry.usdt || 0
    };
  });
  
  // Format donut data
  const donutData = userData.coinData.map((coin: any) => ({
    name: coin.name,
    value: coin.profitValue > 0 ? coin.profitValue : 0
  }));
  
  // Calculate time since last update
  const lastUpdatedDate = new Date(userData.lastUpdated);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60));
  const lastUpdated = diffInHours <= 1 
    ? "Just now" 
    : diffInHours < 24 
      ? `${diffInHours} hours ago` 
      : `${Math.floor(diffInHours / 24)} days ago`;
  
  // Format change values for summary cards
  const formatChange = (value: number) => {
    return value ? `${value > 0 ? '+' : ''}${value.toFixed(1)}%` : '0%';
  };
  
  // Return the formatted data with change values
  return {
    walletBalance: userData.walletBalance,
    totalProfit: userData.totalProfit,
    totalLoss: userData.totalLoss,
    percentageEarned: userData.percentageEarned,
    recurringRevenue: userData.recurringRevenue,
    lastUpdated,
    profitsByCoin,
    lossesByCoin,
    revenueByCoin,
    chartData,
    donutData,
    notifications: userData.notifications,
    
    // Add change values and types
    walletBalanceChange: formatChange(userData.walletBalanceChange),
    walletBalanceChangeType: userData.walletBalanceChangeType || 'positive',
    totalProfitChange: formatChange(userData.totalProfitChange),
    totalProfitChangeType: userData.totalProfitChangeType || 'positive',
    totalLossChange: formatChange(userData.totalLossChange),
    totalLossChangeType: userData.totalLossChangeType || 'negative',
    percentageEarnedChange: formatChange(userData.percentageEarnedChange),
    percentageEarnedChangeType: userData.percentageEarnedChangeType || 'positive',
    recurringRevenueChange: formatChange(userData.recurringRevenueChange),
    recurringRevenueChangeType: userData.recurringRevenueChangeType || 'positive'
  };
}