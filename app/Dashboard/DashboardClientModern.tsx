// app/Dashboard/DashboardClientModern.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import 'swiper/swiper-bundle.css';

// Import UI components
import { 
  Card, 
  Title, 
  BarList, 
  Grid, 
  Text, 
  Flex, 
  Metric,
  Badge,
  Tab, 
  TabGroup, 
  TabList, 
  TabPanel, 
  TabPanels,
  LineChart,
  DonutChart,
  Button
} from '@tremor/react';

// Import icons
import { 
  WalletIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  ChartBarIcon,
  BellIcon,
  BanknotesIcon,
  UserIcon,
  ChartPieIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Import custom components
import WithdrawalModal from "./WithdrawalModal";

// Type definitions
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// Define the shape of our data
interface CoinData {
  name: string;
  value: number;
}

interface CryptoData {
  walletBalance: number;
  totalProfit: number;
  totalLoss: number;
  percentageEarned: number;
  recurringRevenue: number;
  lastUpdated: string;
  profitsByCoin: CoinData[];
  lossesByCoin: CoinData[];
  revenueByCoin: CoinData[];
  chartData: Array<{ date: string; [key: string]: string | number }>;
  donutData: CoinData[];
  notifications: number;
  // Add new change fields
  walletBalanceChange: string;
  walletBalanceChangeType: string;
  totalProfitChange: string;
  totalProfitChangeType: string;
  totalLossChange: string;
  totalLossChangeType: string;
  percentageEarnedChange: string;
  percentageEarnedChangeType: string;
  recurringRevenueChange: string;
  recurringRevenueChangeType: string;
}

interface DashboardClientProps {
  userData: User;
  cryptoData: CryptoData;
}

// Utility function for class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const DashboardClientModern = ({ userData, cryptoData }: DashboardClientProps) => {
  // State for tab selection and withdrawal modal
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  
  // Format bar list data for proper icon rendering with Tremor
  const formatBarListData = (data: CoinData[]) => {
    return data.map(item => ({
      name: item.name,
      value: item.value,
      icon: () => <span className="mr-1">{getCoinIcon(item.name)}</span>
    }));
  };
  
  // Helper function to get coin icon based on name
  const getCoinIcon = (coinName: string): string => {
    const icons: Record<string, string> = {
      'SOL': '🔵',
      'BTC': '🟠',
      'ETH': '🟣',
      'SHIB': '🟡',
      'USDT': '🟢',
    };
    return icons[coinName] || '💰';
  };

  // Generate summary cards data
  const summaryCards = [
    {
      name: 'Wallet Balance',
      value: `$${cryptoData.walletBalance.toLocaleString()}`,
      change: cryptoData.walletBalanceChange,
      changeType: cryptoData.walletBalanceChangeType,
      icon: <WalletIcon className="h-6 w-6 text-blue-500" />,
      color: 'blue'
    },
    {
      name: 'Total Profit',
      value: `$${cryptoData.totalProfit.toLocaleString()}`,
      change: cryptoData.totalProfitChange,
      changeType: cryptoData.totalProfitChangeType,
      icon: <ArrowTrendingUpIcon className="h-6 w-6 text-emerald-500" />,
      color: 'emerald'
    },
    {
      name: 'Total Loss',
      value: `$${cryptoData.totalLoss.toLocaleString()}`,
      change: cryptoData.totalLossChange,
      changeType: cryptoData.totalLossChangeType,
      icon: <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />,
      color: 'red'
    },
    {
      name: 'Percentage Earned',
      value: `${cryptoData.percentageEarned}%`,
      change: cryptoData.percentageEarnedChange,
      changeType: cryptoData.percentageEarnedChangeType,
      icon: <ChartPieIcon className="h-6 w-6 text-indigo-500" />,
      color: 'indigo'
    },
    {
      name: 'Recurring Revenue',
      value: `$${cryptoData.recurringRevenue.toLocaleString()}`,
      change: cryptoData.recurringRevenueChange,
      changeType: cryptoData.recurringRevenueChangeType,
      icon: <ChartBarIcon className="h-6 w-6 text-amber-500" />,
      color: 'amber'
    },
  ];

  // BarList data for profits, losses, and revenue
  const barListData = [
    {
      category: 'Profits',
      stat: `$${cryptoData.totalProfit.toLocaleString()}`,
      data: formatBarListData(cryptoData.profitsByCoin),
      color: 'emerald'
    },
    {
      category: 'Losses',
      stat: `$${cryptoData.totalLoss.toLocaleString()}`,
      data: formatBarListData(cryptoData.lossesByCoin),
      color: 'red'
    },
    {
      category: 'Revenue',
      stat: `$${(cryptoData.totalProfit - cryptoData.totalLoss).toLocaleString()}`,
      data: formatBarListData(cryptoData.revenueByCoin),
      color: 'blue'
    },
  ];

  // Quick access menu items
  const quickAccessItems = [
    {
      title: "Deposit/Fund Account",
      icon: <BanknotesIcon className="h-5 w-5 text-blue-500" />,
      href: "/Payment",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Account Manager",
      icon: <UserIcon className="h-5 w-5 text-emerald-500" />,
      href: "/AccountManager",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Monitor Trades",
      icon: <EyeIcon className="h-5 w-5 text-indigo-500" />,
      href: "/MonitorTrades",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      title: "Notifications",
      icon: <BellIcon className="h-5 w-5 text-amber-500" />,
      href: "/Notifications",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      badge: cryptoData.notifications
    },
  ];

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Modern Top Navigation */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Investment Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                Last update: {cryptoData.lastUpdated}
              </p>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                <ArrowPathIcon className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors relative">
                <BellIcon className="h-5 w-5" />
                {cryptoData.notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                {userData.firstName?.charAt(0) || userData.email?.charAt(0) || "U"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {userData.firstName || 'Investor'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Here&apos;s your investment portfolio summary and performance metrics
          </p>
        </div>

        {/* Modern Metric Cards Grid */}
        <div className="mb-12">
          <Grid numItemsSm={1} numItemsMd={2} numItemsLg={5} className="gap-6">
            {summaryCards.map((item, index) => (
              <div 
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <Card 
                  className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-300"></div>
                  
                  <Flex alignItems="start" className="relative z-10">
                    <div className="flex-1">
                      <Flex alignItems="center" className="space-x-3 mb-4">
                        <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-300 transform group-hover:scale-110">
                          {item.icon}
                        </div>
                        <Text className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                          {item.name}
                        </Text>
                      </Flex>
                      <Metric className="mt-2 text-gray-900 dark:text-white text-2xl lg:text-3xl font-bold">
                        {item.value}
                      </Metric>
                    </div>
                  </Flex>
                  
                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Badge 
                      color={item.changeType === 'positive' ? 'emerald' : 'red'}
                      className="text-xs font-semibold px-3 py-1"
                    >
                      {item.changeType === 'positive' ? '↑' : '↓'} {item.change}
                    </Badge>
                  </div>
                </Card>
              </div>
            ))}
          </Grid>
        </div>

        {/* Tabs Section */}
        <TabGroup className="mb-8" index={selectedIndex} onIndexChange={setSelectedIndex}>
          <TabList className="mb-8 border-b border-gray-200 dark:border-gray-800 flex space-x-8">
            <Tab className="px-0 py-3 text-gray-700 dark:text-gray-300 font-medium border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 data-[selected]:border-blue-600 data-[selected]:text-blue-600 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <ChartBarIcon className="h-5 w-5" />
                <span>Overview</span>
              </div>
            </Tab>
            <Tab className="px-0 py-3 text-gray-700 dark:text-gray-300 font-medium border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 data-[selected]:border-blue-600 data-[selected]:text-blue-600 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <ChartPieIcon className="h-5 w-5" />
                <span>Distribution</span>
              </div>
            </Tab>
            <Tab className="px-0 py-3 text-gray-700 dark:text-gray-300 font-medium border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 data-[selected]:border-blue-600 data-[selected]:text-blue-600 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <EyeIcon className="h-5 w-5" />
                <span>Quick Access</span>
              </div>
            </Tab>
          </TabList>

          <TabPanels>
            {/* Overview Tab */}
            <TabPanel>
              <div className="space-y-8">
                {/* Performance Chart - Full Width */}
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="mb-6">
                    <Title className="text-gray-900 dark:text-white text-xl">Portfolio Performance</Title>
                    <Text className="text-gray-600 dark:text-gray-400 mt-1">Monthly revenue trends across your investments</Text>
                  </div>
                  <LineChart
                    className="h-80 mt-8"
                    data={cryptoData.chartData}
                    index="date"
                    categories={["SOL", "BTC", "ETH"]}
                    colors={["blue", "orange", "purple"]}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    yAxisWidth={60}
                    showAnimation={true}
                  />
                </Card>

                {/* Breakdown Cards */}
                <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
                  {barListData.map((item, index) => (
                    <Card 
                      key={index}
                      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <Title className="text-gray-900 dark:text-white text-lg">{item.category}</Title>
                        </div>
                        <Badge 
                          color={item.color === 'red' ? 'red' : item.color === 'emerald' ? 'emerald' : 'blue'}
                          className="font-bold text-sm px-4 py-2"
                        >
                          {item.stat}
                        </Badge>
                      </div>
                      <BarList
                        data={item.data}
                        className="mt-4"
                        valueFormatter={(number) => `$${number.toLocaleString()}`}
                      />
                    </Card>
                  ))}
                </Grid>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
                  <Button 
                    size="lg"
                    color="blue"
                    className="font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View All Details
                  </Button>
                  <Button 
                    size="lg"
                    className="font-semibold bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800"
                    onClick={() => setIsWithdrawalModalOpen(true)}
                  >
                    Withdraw Funds
                  </Button>
                </div>

                {/* Withdrawal Modal */}
                <WithdrawalModal 
                  isOpen={isWithdrawalModalOpen} 
                  onClose={() => setIsWithdrawalModalOpen(false)} 
                  availableBalance={cryptoData.walletBalance}
                />
              </div>
            </TabPanel>

            {/* Distribution Tab */}
            <TabPanel>
              <div className="space-y-8">
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <Title className="text-gray-900 dark:text-white text-xl mb-2">Portfolio Distribution</Title>
                  <Text className="text-gray-600 dark:text-gray-400 mb-8">Asset allocation across your investments</Text>
                  <DonutChart
                    className="h-80 mt-8"
                    data={cryptoData.donutData}
                    category="value"
                    index="name"
                    colors={["blue", "orange", "purple", "amber", "emerald"]}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    showAnimation={true}
                  />
                </Card>

                {/* Distribution Stats */}
                <Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="gap-6">
                  {cryptoData.donutData.map((coin, index) => (
                    <Card 
                      key={index}
                      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow duration-300"
                    >
                      <Flex alignItems="center" justifyContent="between">
                        <div>
                          <Text className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{coin.name}</Text>
                          <Metric className="text-gray-900 dark:text-white mt-2 text-2xl">
                            ${coin.value.toLocaleString()}
                          </Metric>
                        </div>
                        <div className="text-right">
                          <Badge color="blue" className="text-base font-bold px-3 py-2">
                            {((coin.value / cryptoData.donutData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                          </Badge>
                        </div>
                      </Flex>
                    </Card>
                  ))}
                </Grid>
              </div>
            </TabPanel>

            {/* Quick Access Tab */}
            <TabPanel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickAccessItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <div className="group h-full cursor-pointer transform transition-all duration-300 hover:scale-105">
                      <Card className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300"></div>
                        
                        <Flex alignItems="start" justifyContent="between" className="relative z-10">
                          <div className="flex-1">
                            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 w-fit mb-4 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-300 transform group-hover:scale-110">
                              {item.icon}
                            </div>
                            <Text className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base">
                              {item.title}
                            </Text>
                          </div>
                          {item.badge && (
                            <Badge color="red" className="font-bold text-sm px-2.5 py-1">
                              {item.badge}
                            </Badge>
                          )}
                        </Flex>

                        <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                          <span className="text-sm">Access →</span>
                        </div>
                      </Card>
                    </div>
                  </Link>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        {/* Account Details Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border border-blue-200 dark:border-gray-800 mt-12">
          <Flex alignItems="center" justifyContent="between" className="mb-8">
            <Title className="text-gray-900 dark:text-white text-xl">Account Information</Title>
            <Badge color="emerald" className="font-bold text-base px-4 py-2">
              ✓ Verified
            </Badge>
          </Flex>
          <Grid numItemsSm={2} numItemsMd={2} numItemsLg={4} className="gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                Email Address
              </Text>
              <Text className="text-gray-900 dark:text-white font-semibold text-base">
                {userData.email || 'Not available'}
              </Text>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                Full Name
              </Text>
              <Text className="text-gray-900 dark:text-white font-semibold text-base">
                {userData.firstName 
                  ? `${userData.firstName} ${userData.lastName || ''}` 
                  : 'Not available'}
              </Text>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                Account Status
              </Text>
              <Badge color="emerald" className="font-bold text-sm px-3 py-1">
                Active
              </Badge>
            </div>
            <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                Member Since
              </Text>
              <Text className="text-gray-900 dark:text-white font-semibold text-base">
                {new Date().getFullYear()}
              </Text>
            </div>
          </Grid>
        </Card>
      </main>
    </div>
  );
};

export default DashboardClientModern;
