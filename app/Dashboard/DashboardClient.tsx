// app/Dashboard/DashboardClient.tsx
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
}

interface DashboardClientProps {
  userData: User;
  cryptoData: CryptoData;
}

// Utility function for class names
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const DashboardClient = ({ userData, cryptoData }: DashboardClientProps) => {
  // State for tab selection and withdrawal modal
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  
  // Format bar list data for proper icon rendering with Tremor
  const formatBarListData = (data: CoinData[]) => {
    return data.map(item => ({
      name: item.name,
      value: item.value,
      // Use a component or function that returns a JSX element for the icon
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
      change: '+12.3%',
      changeType: 'positive',
      icon: <WalletIcon className="h-6 w-6 text-blue-500" />,
      color: 'blue'
    },
    {
      name: 'Total Profit',
      value: `$${cryptoData.totalProfit.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'positive',
      icon: <ArrowTrendingUpIcon className="h-6 w-6 text-emerald-500" />,
      color: 'emerald'
    },
    {
      name: 'Total Loss',
      value: `$${cryptoData.totalLoss.toLocaleString()}`,
      change: '-3.4%',
      changeType: 'negative',
      icon: <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />,
      color: 'red'
    },
    {
      name: 'Percentage Earned by Trade',
      value: `${cryptoData.percentageEarned}%`,
      change: '+5.1%',
      changeType: 'positive',
      icon: <ChartPieIcon className="h-6 w-6 text-indigo-500" />,
      color: 'indigo'
    },
    {
      name: 'Recurring Revenue',
      value: `$${cryptoData.recurringRevenue.toLocaleString()}`,
      change: '+2.5%',
      changeType: 'positive',
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
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Trading Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {cryptoData.lastUpdated}
              </p>
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                <ArrowPathIcon className="h-5 w-5" />
              </button>
              <div className="relative">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                  <BellIcon className="h-5 w-5" />
                </button>
                {cryptoData.notifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {cryptoData.notifications}
                  </span>
                )}
              </div>
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {userData.firstName?.charAt(0) || userData.email?.charAt(0) || "U"}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {userData.firstName 
                      ? `${userData.firstName} ${userData.lastName || ''}` 
                      : userData.email || 'User'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="mb-8">
          <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
            {summaryCards.map((item, index) => (
              <Card key={index} decoration="top" decorationColor={item.color} className="hover:shadow-md transition-shadow duration-200">
                <Flex alignItems="start">
                  <div className="truncate">
                    <Flex alignItems="center" className="space-x-2">
                      {item.icon}
                      <Text className="truncate">{item.name}</Text>
                    </Flex>
                    <Metric className="mt-1">{item.value}</Metric>
                  </div>
                  <Badge 
                    color={item.changeType === 'positive' ? 'emerald' : 'red'} 
                    size="sm"
                  >
                    {item.change}
                  </Badge>
                </Flex>
              </Card>
            ))}
          </Grid>
        </div>

        {/* Tabbed Content Area */}
        <TabGroup className="mb-8" index={selectedIndex} onIndexChange={setSelectedIndex}>
          <TabList className="mb-6">
            <Tab icon={ChartBarIcon}>Overview</Tab>
            <Tab icon={ChartPieIcon}>Distribution</Tab>
            <Tab icon={EyeIcon}>Quick Access</Tab>
          </TabList>
          <TabPanels>
            {/* Overview Tab */}
            <TabPanel>
              <div className="space-y-6">
                {/* Trade Performance Chart */}
                <Card>
                  <Title>Trade Performance</Title>
                  <Text>Monthly revenue by cryptocurrency</Text>
                  <LineChart
                    className="h-72 mt-4"
                    data={cryptoData.chartData}
                    index="date"
                    categories={["SOL", "BTC", "ETH"]}
                    colors={["blue", "orange", "purple"]}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                    yAxisWidth={60}
                  />
                </Card>
                
                {/* BarList for Profits, Losses, Revenue */}
                <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
                  {barListData.map((item, index) => (
                    <Card key={index} decoration="top" decorationColor={item.color}>
                      <Flex alignItems="start">
                        <Title>{item.category}</Title>
                        <Badge color={item.color === 'red' ? 'red' : 'emerald'} size="sm">
                          {item.stat}
                        </Badge>
                      </Flex>
                      <BarList
                        data={item.data}
                        className="mt-4"
                        valueFormatter={(number) => `$${number.toLocaleString()}`}
                      />
                    </Card>
                  ))}
                </Grid>
                
                {/* Additional Controls */}
                <div className="flex justify-end space-x-4">
                  <Button 
                    size="md" 
                    variant="secondary" 
                    color="red" 
                    icon={BanknotesIcon}
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
              <div className="space-y-6">
                <Card>
                  <Title>Portfolio Distribution</Title>
                  <Text>Allocation by cryptocurrency</Text>
                  <DonutChart
                    className="h-72 mt-4"
                    data={cryptoData.donutData}
                    category="value"
                    index="name"
                    colors={["blue", "orange", "purple", "amber", "emerald"]}
                    valueFormatter={(number) => `$${number.toLocaleString()}`}
                  />
                </Card>
              </div>
            </TabPanel>
            
            {/* Quick Access Tab */}
            <TabPanel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickAccessItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <Card className={`${item.bgColor} hover:shadow-md transition-all duration-200 cursor-pointer h-full`}>
                      <Flex alignItems="center" justifyContent="between">
                        <Flex alignItems="center" className="space-x-3">
                          {item.icon}
                          <Text className="font-medium">{item.title}</Text>
                        </Flex>
                        {item.badge && (
                          <Badge color="red" size="sm">
                            {item.badge}
                          </Badge>
                        )}
                      </Flex>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        
        {/* User Information Section */}
        <Card className="mb-8">
          <Flex alignItems="center" justifyContent="between" className="mb-4">
            <Title>Account Details</Title>
            <Badge color="blue" size="sm">
              Verified
            </Badge>
          </Flex>
          <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
            <div>
              <Text className="text-gray-500 dark:text-gray-400">Email</Text>
              <Text className="font-medium">{userData.email || 'Not available'}</Text>
            </div>
            <div>
              <Text className="text-gray-500 dark:text-gray-400">Name</Text>
              <Text className="font-medium">
                {userData.firstName 
                  ? `${userData.firstName} ${userData.lastName || ''}` 
                  : 'Not available'}
              </Text>
            </div>
            <div>
              <Text className="text-gray-500 dark:text-gray-400">Account ID</Text>
              <Text className="font-medium">{userData.id || 'Not available'}</Text>
            </div>
            <div>
              <Text className="text-gray-500 dark:text-gray-400">Status</Text>
              <Text className="font-medium">Active</Text>
            </div>
          </Grid>
        </Card>
      </main>
    </div>
  );
};

export default DashboardClient;