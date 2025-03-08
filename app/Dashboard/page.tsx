// app/Dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardClient from "./DashboardClient";
import { db } from "@/lib/db";

// Server Component - handles data fetching
const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Dashboard");
  }

  // Prepare user data from session
  const userData = {
    id: session.user.id,
    email: session.user.email,
    firstName: session.user.firstName || "",
    lastName: session.user.lastName || "",
  };
  
  // Fetch the user's crypto data from database
  const userId = parseInt(session.user.id);
  
  // Try to find existing crypto data
  let cryptoData = await db.cryptoData.findUnique({
    where: { userId },
    include: {
      coinData: true,
      chartData: {
        orderBy: { date: 'asc' }
      }
    }
  });
  
  // If no data exists yet, create default data
  if (!cryptoData) {
    // Create default crypto data record
    cryptoData = await db.cryptoData.create({
      data: {
        userId,
        walletBalance: 0,
        totalProfit: 0,
        totalLoss: 0,
        percentageEarned: 0,
        recurringRevenue: 0,
        notifications: 0,
        
        // Create default coin data
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
        
        // Create default chart data
        chartData: {
          createMany: {
            data: generateDefaultChartData()
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
  }
  
  // Format the data for the frontend
  const formattedCryptoData = formatCryptoDataForClient(cryptoData);

  return (
    <DashboardClient userData={userData} cryptoData={formattedCryptoData} />
  );
};

// Generate default chart data for the past 5 months
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

// Format crypto data from database to format expected by the DashboardClient
function formatCryptoDataForClient(cryptoData: any) {
  // Define coin icons
  const coinIcons: Record<string, string> = {
    'SOL': '🔵',
    'BTC': '🟠',
    'ETH': '🟣',
    'SHIB': '🟡',
    'USDT': '🟢',
  };
  
  // Format profits by coin
  const profitsByCoin = cryptoData.coinData.map((coin: any) => ({
    name: coin.name,
    value: coin.profitValue,
    icon: coinIcons[coin.name] || '💰'
  }));
  
  // Format losses by coin (filter out zero values)
  const lossesByCoin = cryptoData.coinData
    .filter((coin: any) => coin.lossValue > 0)
    .map((coin: any) => ({
      name: coin.name,
      value: coin.lossValue,
      icon: coinIcons[coin.name] || '💰'
    }));
  
  // Format revenue by coin
  const revenueByCoin = cryptoData.coinData.map((coin: any) => ({
    name: coin.name,
    value: coin.revenueValue,
    icon: coinIcons[coin.name] || '💰'
  }));
  
  // Format chart data
  const chartData = cryptoData.chartData.map((entry: any) => {
    return {
      date: entry.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      SOL: entry.sol || 0,
      BTC: entry.btc || 0,
      ETH: entry.eth || 0
    };
  });
  
  // Format donut data for the portfolio distribution
  const donutData = cryptoData.coinData.map((coin: any) => ({
    name: coin.name,
    value: coin.profitValue > 0 ? coin.profitValue : 0
  }));
  
  // Calculate time since last update
  const lastUpdatedDate = new Date(cryptoData.lastUpdated);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60));
  const lastUpdated = diffInHours <= 1 
    ? "Just now" 
    : diffInHours < 24 
      ? `${diffInHours} hours ago` 
      : `${Math.floor(diffInHours / 24)} days ago`;
  
  return {
    walletBalance: cryptoData.walletBalance,
    totalProfit: cryptoData.totalProfit,
    totalLoss: cryptoData.totalLoss,
    percentageEarned: cryptoData.percentageEarned,
    recurringRevenue: cryptoData.recurringRevenue,
    lastUpdated,
    profitsByCoin,
    lossesByCoin,
    revenueByCoin,
    chartData,
    donutData,
    notifications: cryptoData.notifications
  };
}

export default Dashboard;