// app/Dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

// Server Component - handles data fetching
const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Dashboard");
  }

  // This can be your actual data fetching logic
  const userData = {
    id: session.user.id,
    email: session.user.email,
    firstName: session.user.firstName || "",
    lastName: session.user.lastName || "",
  };
  
  // Mock data for the dashboard - in production, you would fetch this from your API
  const mockCryptoData = {
    walletBalance: 12584.23,
    totalProfit: 3265.47,
    totalLoss: 1254.12,
    percentageEarned: 24.5,
    recurringRevenue: 856.32,
    lastUpdated: "2 hours ago",
    
    profitsByCoin: [
      { name: 'SOL', value: 1256.32, icon: '🔵' },
      { name: 'BTC', value: 874.15, icon: '🟠' },
      { name: 'ETH', value: 625.75, icon: '🟣' },
      { name: 'SHIB', value: 342.25, icon: '🟡' },
      { name: 'USDT', value: 167.00, icon: '🟢' }
    ],
    
    lossesByCoin: [
      { name: 'SOL', value: 312.45, icon: '🔵' },
      { name: 'BTC', value: 524.87, icon: '🟠' },
      { name: 'ETH', value: 178.45, icon: '🟣' },
      { name: 'SHIB', value: 238.35, icon: '🟡' }
    ],
    
    revenueByCoin: [
      { name: 'SOL', value: 943.87, icon: '🔵' },
      { name: 'BTC', value: 349.28, icon: '🟠' },
      { name: 'ETH', value: 447.30, icon: '🟣' },
      { name: 'SHIB', value: 103.90, icon: '🟡' },
      { name: 'USDT', value: 167.00, icon: '🟢' }
    ],
    
    chartData: [
      {
        date: '2023-01-01',
        SOL: 943.87,
        BTC: 349.28,
        ETH: 447.30,
      },
      {
        date: '2023-02-01',
        SOL: 1243.87,
        BTC: 649.28,
        ETH: 547.30,
      },
      {
        date: '2023-03-01',
        SOL: 1143.87,
        BTC: 549.28,
        ETH: 647.30,
      },
      {
        date: '2023-04-01',
        SOL: 1343.87,
        BTC: 749.28,
        ETH: 847.30,
      },
      {
        date: '2023-05-01',
        SOL: 1543.87,
        BTC: 849.28,
        ETH: 947.30,
      },
    ],
    
    donutData: [
      { name: 'SOL', value: 1256.32 },
      { name: 'BTC', value: 874.15 },
      { name: 'ETH', value: 625.75 },
      { name: 'SHIB', value: 342.25 },
      { name: 'USDT', value: 167.00 }
    ],
    
    notifications: 3
  };

  return (
    <DashboardClient userData={userData} cryptoData={mockCryptoData} />
  );
};

export default Dashboard;