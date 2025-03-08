// app/Dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [cryptoData, setCryptoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    // Only fetch data when authenticated
    if (status === "authenticated" && session?.user) {
      // Set user data
      setUserData({
        // id: session.user.id,
        email: session.user.email,
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
      });

      // Fetch crypto data
      fetchCryptoData();
    }
  }, [status, session, router]);

  const fetchCryptoData = async () => {
    try {
      setIsLoading(true);
      // This will call our API route which will handle all database operations
      const response = await fetch("/api/user/crypto-data");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch crypto data: ${response.status}`);
      }
      
      const data = await response.json();
      setCryptoData(data);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError(err.message);
      
      // Use fallback data on error
      setCryptoData({
        walletBalance: 0,
        totalProfit: 0,
        totalLoss: 0,
        percentageEarned: 0,
        recurringRevenue: 0,
        lastUpdated: "Just now",
        profitsByCoin: [],
        lossesByCoin: [],
        revenueByCoin: [],
        chartData: [],
        donutData: [],
        notifications: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <h1 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">Error Loading Dashboard</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
        <button 
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors" 
          onClick={fetchCryptoData}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!userData || !cryptoData) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-lg text-gray-700 dark:text-gray-300">Preparing dashboard...</div>
    </div>;
  }

  return <DashboardClient userData={userData} cryptoData={cryptoData} />;
}