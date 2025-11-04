// app/Dashboard/page.tsx — server component
import { getServerAuthSession } from "@/lib/getServerAuthSession";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import { db } from "@/lib/db";
import { formatCryptoData } from "@/lib/formatCryptoData";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (!session?.user?.id) {
    redirect("/signin");
  }

  const userId = session.user.id as string;

  // Fetch crypto data server-side
  let userData = await db.cryptoData.findUnique({
    where: { userId },
    include: {
      coinData: true,
      chartData: {
        orderBy: { date: 'asc' }
      }
    }
  });

  if (!userData) {
    // Create default data if missing
    // Reuse the API route helper behaviour by creating minimal defaults here
    userData = await db.cryptoData.create({
      data: {
        userId,
        walletBalance: 0,
        totalProfit: 0,
        totalLoss: 0,
        percentageEarned: 0,
        recurringRevenue: 0,
        notifications: 0,
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
        chartData: {
          createMany: {
            data: []
          }
        }
      },
      include: {
        coinData: true,
        chartData: true
      }
    });
  }

  const formatted = formatCryptoData(userData);

  const user = {
    id: String(userId),
    email: session.user.email,
    firstName: session.user.firstName || '',
    lastName: session.user.lastName || ''
  };

  return <DashboardClient userData={user} cryptoData={formatted} />;
}