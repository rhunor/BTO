// app/api/admin/crypto-data/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// This should be secured by role-based authorization in a production app
// For simplicity, we're just checking if the user exists

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();
    const { userId, cryptoData } = body;
    
    if (!userId || !cryptoData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Check if the target user exists
    const userExists = await db.user.findUnique({
      where: { id: userId }
    });
    
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Check if crypto data exists for the user
    const existingData = await db.cryptoData.findUnique({
      where: { userId }
    });
    
    let updatedData;
    
    if (existingData) {
      // Update the existing crypto data
      updatedData = await updateExistingCryptoData(userId, cryptoData);
    } else {
      // Create new crypto data
      updatedData = await createNewCryptoData(userId, cryptoData);
    }
    
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error("Error updating crypto data:", error);
    return NextResponse.json({ error: "Failed to update crypto data" }, { status: 500 });
  }
}

async function updateExistingCryptoData(userId: number, cryptoData: any) {
  // Update the main crypto data
  const updated = await db.cryptoData.update({
    where: { userId },
    data: {
      walletBalance: cryptoData.walletBalance || 0,
      totalProfit: cryptoData.totalProfit || 0,
      totalLoss: cryptoData.totalLoss || 0,
      percentageEarned: cryptoData.percentageEarned || 0,
      recurringRevenue: cryptoData.recurringRevenue || 0,
      notifications: cryptoData.notifications || 0,
      
      // Add change fields
      walletBalanceChange: cryptoData.walletBalanceChange !== undefined ? cryptoData.walletBalanceChange : 0,
      walletBalanceChangeType: cryptoData.walletBalanceChangeType || 'positive',
      totalProfitChange: cryptoData.totalProfitChange !== undefined ? cryptoData.totalProfitChange : 0,
      totalProfitChangeType: cryptoData.totalProfitChangeType || 'positive',
      totalLossChange: cryptoData.totalLossChange !== undefined ? cryptoData.totalLossChange : 0,
      totalLossChangeType: cryptoData.totalLossChangeType || 'negative',
      percentageEarnedChange: cryptoData.percentageEarnedChange !== undefined ? cryptoData.percentageEarnedChange : 0,
      percentageEarnedChangeType: cryptoData.percentageEarnedChangeType || 'positive',
      recurringRevenueChange: cryptoData.recurringRevenueChange !== undefined ? cryptoData.recurringRevenueChange : 0,
      recurringRevenueChangeType: cryptoData.recurringRevenueChangeType || 'positive',
      
      lastUpdated: new Date()
    }
  });
  
  // Get the crypto data ID
  const cryptoDataId = updated.id;
  
  // Update coin data if provided
  if (cryptoData.coinData && Array.isArray(cryptoData.coinData)) {
    for (const coin of cryptoData.coinData) {
      const { name, profitValue, lossValue, revenueValue } = coin;
      
      // Update or create coin data
      await db.coinData.upsert({
        where: {
          cryptoDataId_name: {
            cryptoDataId,
            name
          }
        },
        update: {
          profitValue: profitValue || 0,
          lossValue: lossValue || 0,
          revenueValue: revenueValue || 0
        },
        create: {
          cryptoDataId,
          name,
          profitValue: profitValue || 0,
          lossValue: lossValue || 0,
          revenueValue: revenueValue || 0
        }
      });
    }
  }
  
  // Update chart data if provided
  if (cryptoData.chartData && Array.isArray(cryptoData.chartData)) {
    for (const entry of cryptoData.chartData) {
      const { date, sol, btc, eth, shib, usdt } = entry;
      
      if (!date) continue;
      
      const entryDate = new Date(date);
      
      // Update or create chart data entry
      await db.chartData.upsert({
        where: {
          cryptoDataId_date: {
            cryptoDataId,
            date: entryDate
          }
        },
        update: {
          sol: sol !== undefined ? sol : null,
          btc: btc !== undefined ? btc : null,
          eth: eth !== undefined ? eth : null,
          shib: shib !== undefined ? shib : null,
          usdt: usdt !== undefined ? usdt : null
        },
        create: {
          cryptoDataId,
          date: entryDate,
          sol: sol !== undefined ? sol : null,
          btc: btc !== undefined ? btc : null,
          eth: eth !== undefined ? eth : null,
          shib: shib !== undefined ? shib : null,
          usdt: usdt !== undefined ? usdt : null
        }
      });
    }
  }
  
  // Return the updated data
  return await db.cryptoData.findUnique({
    where: { userId },
    include: {
      coinData: true,
      chartData: {
        orderBy: { date: 'asc' }
      }
    }
  });
}

async function createNewCryptoData(userId: number, cryptoData: any) {
  // Create base crypto data
  const created = await db.cryptoData.create({
    data: {
      userId,
      walletBalance: cryptoData.walletBalance || 0,
      totalProfit: cryptoData.totalProfit || 0,
      totalLoss: cryptoData.totalLoss || 0,
      percentageEarned: cryptoData.percentageEarned || 0,
      recurringRevenue: cryptoData.recurringRevenue || 0,
      notifications: cryptoData.notifications || 0,
      
      // Add change fields
      walletBalanceChange: cryptoData.walletBalanceChange !== undefined ? cryptoData.walletBalanceChange : 0,
      walletBalanceChangeType: cryptoData.walletBalanceChangeType || 'positive',
      totalProfitChange: cryptoData.totalProfitChange !== undefined ? cryptoData.totalProfitChange : 0,
      totalProfitChangeType: cryptoData.totalProfitChangeType || 'positive',
      totalLossChange: cryptoData.totalLossChange !== undefined ? cryptoData.totalLossChange : 0,
      totalLossChangeType: cryptoData.totalLossChangeType || 'negative',
      percentageEarnedChange: cryptoData.percentageEarnedChange !== undefined ? cryptoData.percentageEarnedChange : 0,
      percentageEarnedChangeType: cryptoData.percentageEarnedChangeType || 'positive',
      recurringRevenueChange: cryptoData.recurringRevenueChange !== undefined ? cryptoData.recurringRevenueChange : 0,
      recurringRevenueChangeType: cryptoData.recurringRevenueChangeType || 'positive'
    }
  });
  
  const cryptoDataId = created.id;
  
  // Create coin data if provided
  if (cryptoData.coinData && Array.isArray(cryptoData.coinData)) {
    const coinDataToCreate = cryptoData.coinData.map((coin: any) => ({
      cryptoDataId,
      name: coin.name,
      profitValue: coin.profitValue || 0,
      lossValue: coin.lossValue || 0,
      revenueValue: coin.revenueValue || 0
    }));
    
    if (coinDataToCreate.length > 0) {
      await db.coinData.createMany({
        data: coinDataToCreate
      });
    }
  } else {
    // Create default coin data
    await db.coinData.createMany({
      data: [
        { cryptoDataId, name: 'SOL', profitValue: 0, lossValue: 0, revenueValue: 0 },
        { cryptoDataId, name: 'BTC', profitValue: 0, lossValue: 0, revenueValue: 0 },
        { cryptoDataId, name: 'ETH', profitValue: 0, lossValue: 0, revenueValue: 0 },
        { cryptoDataId, name: 'SHIB', profitValue: 0, lossValue: 0, revenueValue: 0 },
        { cryptoDataId, name: 'USDT', profitValue: 0, lossValue: 0, revenueValue: 0 }
      ]
    });
  }
  
  // Create chart data if provided
  if (cryptoData.chartData && Array.isArray(cryptoData.chartData)) {
    const chartDataToCreate = cryptoData.chartData.map((entry: any) => ({
      cryptoDataId,
      date: new Date(entry.date),
      sol: entry.sol !== undefined ? entry.sol : null,
      btc: entry.btc !== undefined ? entry.btc : null,
      eth: entry.eth !== undefined ? entry.eth : null,
      shib: entry.shib !== undefined ? entry.shib : null,
      usdt: entry.usdt !== undefined ? entry.usdt : null
    }));
    
    if (chartDataToCreate.length > 0) {
      await db.chartData.createMany({
        data: chartDataToCreate
      });
    }
  } else {
    // Create default chart data
    const today = new Date();
    const chartData = [];
    
    for (let i = 4; i >= 0; i--) {
      chartData.push({
        cryptoDataId,
        date: new Date(today.getFullYear(), today.getMonth() - i, 1),
        sol: 0,
        btc: 0,
        eth: 0,
        shib: 0,
        usdt: 0
      });
    }
    
    await db.chartData.createMany({
      data: chartData
    });
  }
  
  // Return the created data
  return await db.cryptoData.findUnique({
    where: { userId },
    include: {
      coinData: true,
      chartData: {
        orderBy: { date: 'asc' }
      }
    }
  });
}