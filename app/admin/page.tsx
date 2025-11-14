// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  Title,
  Text,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TextInput,
  Button,
  Grid,
  Flex,
  Metric,
  Select,
  SelectItem,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@tremor/react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

type ChangeType = 'positive' | 'negative';

interface CoinData {
  name: string;
  profitValue: number;
  lossValue: number;
  revenueValue: number;
}

interface CryptoData {
  walletBalance: number;
  totalProfit: number;
  totalLoss: number;
  percentageEarned: number;
  recurringRevenue: number;
  notifications: number;
  walletBalanceChange: number;
  walletBalanceChangeType: ChangeType;
  totalProfitChange: number;
  totalProfitChangeType: ChangeType;
  totalLossChange: number;
  totalLossChangeType: ChangeType;
  percentageEarnedChange: number;
  percentageEarnedChangeType: ChangeType;
  recurringRevenueChange: number;
  recurringRevenueChangeType: ChangeType;
  coinData: CoinData[];
}

interface Message {
  type: 'error' | 'success' | 'info';
  text: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [cryptoData, setCryptoData] = useState<CryptoData>({
    walletBalance: 0,
    totalProfit: 0,
    totalLoss: 0,
    percentageEarned: 0,
    recurringRevenue: 0,
    notifications: 0,
    walletBalanceChange: 0,
    walletBalanceChangeType: 'positive',
    totalProfitChange: 0,
    totalProfitChangeType: 'positive',
    totalLossChange: 0,
    totalLossChangeType: 'negative',
    percentageEarnedChange: 0,
    percentageEarnedChangeType: 'positive',
    recurringRevenueChange: 0,
    recurringRevenueChangeType: 'positive',
    coinData: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: 'info', text: '' });
  
  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: 'info', text: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const closeMessage = (): void => {
    setMessage({ type: 'info', text: '' });
  };
  
  // Check authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);
  
  // Fetch users
  useEffect(() => {
    if (status === "authenticated") {
      fetchUsers();
    }
  }, [status]);
  
  const fetchUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      
      const data: User[] = await response.json();
      setUsers(data);
      setMessage({ type: "info", text: "Users loaded successfully." });
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage({ type: "error", text: "Failed to fetch users." });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch crypto data for selected user
  const fetchUserCryptoData = async (userId: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/crypto-data/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch crypto data");
      
      const data: CryptoData = await response.json();
      setCryptoData(data);
      const user = users.find(u => u.id === userId);
      if (user) {
        setSelectedUser(user);
      }
      setMessage({ type: "success", text: `Crypto data for ${user?.firstName} ${user?.lastName} loaded successfully.` });
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setMessage({ type: "error", text: "Failed to fetch user crypto data." });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update crypto data
  const updateCryptoData = async (): Promise<void> => {
    if (!selectedUser || !cryptoData) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/crypto-data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          cryptoData
        })
      });
      
      if (!response.ok) throw new Error("Failed to update crypto data");
      
      setMessage({ type: "success", text: "Crypto data updated successfully." });
      
      // Refresh the data
      await fetchUserCryptoData(selectedUser.id);
    } catch (error) {
      console.error("Error updating crypto data:", error);
      setMessage({ type: "error", text: "Failed to update crypto data." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes for main metrics
  const handleInputChange = (name: keyof CryptoData, value: string): void => {
    setCryptoData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };
  
  // Handle form input changes for string values
  const handleStringInputChange = (name: keyof CryptoData, value: string): void => {
    setCryptoData(prev => ({
      ...prev,
      [name]: value as ChangeType
    }));
  };
  
  // Handle form input changes for coin data
  const handleCoinDataChange = (coinName: string, field: keyof CoinData, value: string): void => {
    setCryptoData(prev => {
      const newCoinData = prev.coinData.map(coin => {
        if (coin.name === coinName) {
          return { ...coin, [field]: parseFloat(value) || 0 };
        }
        return coin;
      });
      
      return { ...prev, coinData: newCoinData };
    });
  };
  
  // Create API endpoint for fetching users
  const createAdminUsersAPI = (): void => {
    // For demo purposes, we'll just fetch and show a success message
    setMessage({ type: "info", text: "This would create the admin/users API endpoint." });
  };

  // Custom Delta-like component
  const Delta = ({ content, changeType }: { content: string; changeType: ChangeType }) => (
    <Text className={`text-sm ${
      changeType === 'positive' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
    }`}>
      {content} {changeType === 'positive' ? '↑' : '↓'}
    </Text>
  );
  
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-6 px-4 sm:py-8 sm:px-6">
      <div className="max-w-7xl mx-auto relative z-0">
        <Flex className="mb-6" justifyContent="start" alignItems="center">
          <Title className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</Title>
        </Flex>
        
        {/* Toast-like Message Banner */}
        {message.text && (
          <Card className={`fixed top-4 right-4 z-[9999] w-80 max-w-sm shadow-xl border-0 animate-in slide-in-from-top-2 duration-300 ease-out ${
            message.type === "error" 
              ? "bg-red-50 border-red-200 dark:bg-red-900/20" 
              : message.type === "success"
                ? "bg-green-50 border-green-200 dark:bg-green-900/20"
                : "bg-blue-50 border-blue-200 dark:bg-blue-900/20"
          }`}>
            <Flex className="justify-between items-start">
              <Text className={`${
                message.type === "error" ? "text-red-800 dark:text-red-200" 
                : message.type === "success" ? "text-green-800 dark:text-green-200"
                : "text-blue-800 dark:text-blue-200"
              } flex-1`}>
                {message.text}
              </Text>
              <Button 
                variant="light" 
                size="xs" 
                onClick={closeMessage}
                className="ml-2 -mt-1 h-4 w-4 p-0"
              >
                ×
              </Button>
            </Flex>
          </Card>
        )}
        
        <Grid numItemsSm={1} numItemsMd={1} numItemsLg={2} className="gap-6 mb-6">
          {/* Left Column - User Selection */}
          <Card className="relative z-[9999] overflow-hidden shadow-lg rounded-xl">
            <Title className="text-xl">Manage User Crypto Data</Title>
            <Text className="mt-2 text-gray-600 dark:text-gray-400">Select a user to manage their crypto data</Text>
        
            {/* User Selection */}
            <div className="mt-6 space-y-4">
              <Text className="font-medium">Select User</Text>
              <Select
                className="w-full"
                placeholder="Select a user"
                disabled={isLoading || users.length === 0}
                onValueChange={(value) => {
                  const userId = value; // user IDs are strings (MongoDB ObjectId)
                  fetchUserCryptoData(userId);
                }}
              >
                {users.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)}>
                    {user.firstName} {user.lastName} ({user.email})
                  </SelectItem>
                ))}
              </Select>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={fetchUsers} loading={isLoading} color="blue" className="flex-1">
                  Refresh Users
                </Button>
                <Button onClick={createAdminUsersAPI} color="indigo" className="flex-1">
                  Create Admin API
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Right Column - Current User Stats */}
          <Card className="overflow-hidden shadow-lg rounded-xl">
            <Title className="text-xl">Current User</Title>
            {selectedUser ? (
              <div className="mt-4 space-y-3">
                <Flex>
                  <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</Text>
                  <Metric className="text-sm truncate">{selectedUser.id}</Metric>
                </Flex>
                <div>
                  <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</Text>
                  <Text className="font-semibold text-gray-900 dark:text-white">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</Text>
                  <Text className="font-semibold text-gray-900 dark:text-white truncate">{selectedUser.email}</Text>
                </div>
              </div>
            ) : (
              <Text className="mt-4 italic text-gray-500 dark:text-gray-400 text-center py-4">
                No user selected
              </Text>
            )}
          </Card>
        </Grid>

        {/* Metrics Overview */}
        {selectedUser && cryptoData && (
          <Card className="mb-6 overflow-hidden shadow-lg rounded-xl">
            <Title className="text-xl mb-2">Quick Overview</Title>
            <Text className="text-gray-600 dark:text-gray-400 mb-6">Key metrics for {selectedUser.firstName} {selectedUser.lastName}</Text>
            <Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="gap-4">
              <div className="space-y-2">
                <Metric className="text-2xl">${cryptoData.walletBalance.toFixed(2)}</Metric>
                <Text className="text-gray-500 dark:text-gray-400">Wallet Balance</Text>
                <Delta content={`${cryptoData.walletBalanceChange}%`} changeType={cryptoData.walletBalanceChangeType} />
              </div>
              <div className="space-y-2">
                <Metric className="text-2xl text-emerald-600 dark:text-emerald-400">${cryptoData.totalProfit.toFixed(2)}</Metric>
                <Text className="text-gray-500 dark:text-gray-400">Total Profit</Text>
                <Delta content={`${cryptoData.totalProfitChange}%`} changeType={cryptoData.totalProfitChangeType} />
              </div>
              <div className="space-y-2">
                <Metric className="text-2xl text-rose-600 dark:text-rose-400">${cryptoData.totalLoss.toFixed(2)}</Metric>
                <Text className="text-gray-500 dark:text-gray-400">Total Loss</Text>
                <Delta content={`${cryptoData.totalLossChange}%`} changeType={cryptoData.totalLossChangeType} />
              </div>
              <div className="space-y-2">
                <Metric className="text-2xl">{cryptoData.percentageEarned}%</Metric>
                <Text className="text-gray-500 dark:text-gray-400">Percentage Earned</Text>
                <Delta content={`${cryptoData.percentageEarnedChange}%`} changeType={cryptoData.percentageEarnedChangeType} />
              </div>
              <div className="space-y-2">
                <Metric className="text-2xl">${cryptoData.recurringRevenue.toFixed(2)}</Metric>
                <Text className="text-gray-500 dark:text-gray-400">Recurring Revenue</Text>
                <Delta content={`${cryptoData.recurringRevenueChange}%`} changeType={cryptoData.recurringRevenueChangeType} />
              </div>
              <div className="space-y-2">
                <Metric className="text-2xl">{cryptoData.notifications}</Metric>
                <Text className="text-gray-500 dark:text-gray-400">Notifications</Text>
              </div>
            </Grid>
          </Card>
        )}

        {/* Crypto Data Management */}
        {selectedUser && (
          <Card className="overflow-hidden shadow-lg rounded-xl">
            <Flex className="mb-4" justifyContent="between" alignItems="center">
              <div>
                <Title className="text-xl">Manage Crypto Data</Title>
                <Text className="text-gray-600 dark:text-gray-400">
                  Update the crypto data for {selectedUser.firstName} {selectedUser.lastName}
                </Text>
              </div>
            </Flex>
            
            <TabGroup className="mt-4">
              <TabList className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Tab>Main Metrics</Tab>
                <Tab>Change Values</Tab>
                <Tab>Coin Data</Tab>
                <Tab>Chart Data</Tab>
              </TabList>
              
              <TabPanels className="mt-4">
                {/* Main Metrics Tab */}
                <TabPanel>
                  <Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="gap-6">
                    <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
                      <Text className="font-medium mb-2">Wallet Balance</Text>
                      <TextInput
                        name="walletBalance"
                        value={String(cryptoData.walletBalance || 0)}
                        onChange={(e) => handleInputChange("walletBalance", e.target.value)}
                        placeholder="Enter wallet balance"
                        type="number"
                        step="0.01"
                        min="0"
                        className="mt-2"
                      />
                    </Card>
                    <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
                      <Text className="font-medium mb-2">Total Profit</Text>
                      <TextInput
                        name="totalProfit"
                        value={String(cryptoData.totalProfit || 0)}
                        onChange={(e) => handleInputChange("totalProfit", e.target.value)}
                        placeholder="Enter total profit"
                        type="number"
                        step="0.01"
                        min="0"
                        className="mt-2"
                      />
                    </Card>
                    <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
                      <Text className="font-medium mb-2">Total Loss</Text>
                      <TextInput
                        name="totalLoss"
                        value={String(cryptoData.totalLoss || 0)}
                        onChange={(e) => handleInputChange("totalLoss", e.target.value)}
                        placeholder="Enter total loss"
                        type="number"
                        step="0.01"
                        min="0"
                        className="mt-2"
                      />
                    </Card>
                    <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
                      <Text className="font-medium mb-2">Percentage Earned</Text>
                      <TextInput
                        name="percentageEarned"
                        value={String(cryptoData.percentageEarned || 0)}
                        onChange={(e) => handleInputChange("percentageEarned", e.target.value)}
                        placeholder="Enter percentage earned"
                        type="number"
                        step="0.1"
                        min="0"
                        className="mt-2"
                      />
                    </Card>
                    <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
                      <Text className="font-medium mb-2">Recurring Revenue</Text>
                      <TextInput
                        name="recurringRevenue"
                        value={String(cryptoData.recurringRevenue || 0)}
                        onChange={(e) => handleInputChange("recurringRevenue", e.target.value)}
                        placeholder="Enter recurring revenue"
                        type="number"
                        step="0.01"
                        min="0"
                        className="mt-2"
                      />
                    </Card>
                    <Card className="p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg">
                      <Text className="font-medium mb-2">Notifications</Text>
                      <TextInput
                        name="notifications"
                        value={String(cryptoData.notifications || 0)}
                        onChange={(e) => handleInputChange("notifications", e.target.value)}
                        placeholder="Enter notifications count"
                        type="number"
                        step="1"
                        min="0"
                        className="mt-2"
                      />
                    </Card>
                  </Grid>
                </TabPanel>
                
                {/* Change Values Tab */}
                <TabPanel>
                  <div className="space-y-6">
                    <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
                      <Card className="p-4">
                        <Title className="text-lg mb-4">Current Changes</Title>
                        <Grid numItemsSm={1} numItemsMd={2} className="gap-4">
                          <Flex className="space-y-1">
                            <Text className="text-sm text-gray-500">Wallet Balance</Text>
                            <Text className="font-medium">{cryptoData.walletBalanceChange}%</Text>
                            <Delta content="" changeType={cryptoData.walletBalanceChangeType} />
                          </Flex>
                          <Flex className="space-y-1">
                            <Text className="text-sm text-gray-500">Total Profit</Text>
                            <Text className="font-medium">{cryptoData.totalProfitChange}%</Text>
                            <Delta content="" changeType={cryptoData.totalProfitChangeType} />
                          </Flex>
                          <Flex className="space-y-1">
                            <Text className="text-sm text-gray-500">Total Loss</Text>
                            <Text className="font-medium">{cryptoData.totalLossChange}%</Text>
                            <Delta content="" changeType={cryptoData.totalLossChangeType} />
                          </Flex>
                          <Flex className="space-y-1">
                            <Text className="text-sm text-gray-500">Percentage Earned</Text>
                            <Text className="font-medium">{cryptoData.percentageEarnedChange}%</Text>
                            <Delta content="" changeType={cryptoData.percentageEarnedChangeType} />
                          </Flex>
                          <Flex className="space-y-1">
                            <Text className="text-sm text-gray-500">Recurring Revenue</Text>
                            <Text className="font-medium">{cryptoData.recurringRevenueChange}%</Text>
                            <Delta content="" changeType={cryptoData.recurringRevenueChangeType} />
                          </Flex>
                        </Grid>
                      </Card>
                      <Card className="p-4">
                        <Text className="font-medium mb-3">Edit Changes</Text>
                        <div className="space-y-4">
                          <Flex className="space-x-3 items-end">
                            <TextInput
                              value={String(cryptoData.walletBalanceChange || 0)}
                              onChange={(e) => handleInputChange("walletBalanceChange", e.target.value)}
                              placeholder="Wallet %"
                              type="number"
                              step="0.1"
                              className="flex-1"
                            />
                            <Select
                              value={cryptoData.walletBalanceChangeType}
                              onValueChange={(value) => handleStringInputChange("walletBalanceChangeType", value)}
                              className="w-32"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </Flex>
                          <Flex className="space-x-3 items-end">
                            <TextInput
                              value={String(cryptoData.totalProfitChange || 0)}
                              onChange={(e) => handleInputChange("totalProfitChange", e.target.value)}
                              placeholder="Profit %"
                              type="number"
                              step="0.1"
                              className="flex-1"
                            />
                            <Select
                              value={cryptoData.totalProfitChangeType}
                              onValueChange={(value) => handleStringInputChange("totalProfitChangeType", value)}
                              className="w-32"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </Flex>
                          <Flex className="space-x-3 items-end">
                            <TextInput
                              value={String(cryptoData.totalLossChange || 0)}
                              onChange={(e) => handleInputChange("totalLossChange", e.target.value)}
                              placeholder="Loss %"
                              type="number"
                              step="0.1"
                              className="flex-1"
                            />
                            <Select
                              value={cryptoData.totalLossChangeType}
                              onValueChange={(value) => handleStringInputChange("totalLossChangeType", value)}
                              className="w-32"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </Flex>
                          <Flex className="space-x-3 items-end">
                            <TextInput
                              value={String(cryptoData.percentageEarnedChange || 0)}
                              onChange={(e) => handleInputChange("percentageEarnedChange", e.target.value)}
                              placeholder="Earned %"
                              type="number"
                              step="0.1"
                              className="flex-1"
                            />
                            <Select
                              value={cryptoData.percentageEarnedChangeType}
                              onValueChange={(value) => handleStringInputChange("percentageEarnedChangeType", value)}
                              className="w-32"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </Flex>
                          <Flex className="space-x-3 items-end">
                            <TextInput
                              value={String(cryptoData.recurringRevenueChange || 0)}
                              onChange={(e) => handleInputChange("recurringRevenueChange", e.target.value)}
                              placeholder="Revenue %"
                              type="number"
                              step="0.1"
                              className="flex-1"
                            />
                            <Select
                              value={cryptoData.recurringRevenueChangeType}
                              onValueChange={(value) => handleStringInputChange("recurringRevenueChangeType", value)}
                              className="w-32"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </Flex>
                        </div>
                      </Card>
                    </Grid>
                  </div>
                </TabPanel>
                
                {/* Coin Data Tab */}
                <TabPanel>
                  <div className="space-y-4">
                    <Table className="mt-4">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell>Coin</TableHeaderCell>
                          <TableHeaderCell className="text-right">Profit Value</TableHeaderCell>
                          <TableHeaderCell className="text-right">Loss Value</TableHeaderCell>
                          <TableHeaderCell className="text-right">Revenue Value</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cryptoData.coinData.map((coin, index) => (
                          <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <TableCell>{coin.name}</TableCell>
                            <TableCell className="text-right">
                              <TextInput
                                value={String(coin.profitValue || 0)}
                                onChange={(e) => handleCoinDataChange(coin.name, "profitValue", e.target.value)}
                                type="number"
                                step="0.01"
                                min="0"
                                className="w-24 text-right"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <TextInput
                                value={String(coin.lossValue || 0)}
                                onChange={(e) => handleCoinDataChange(coin.name, "lossValue", e.target.value)}
                                type="number"
                                step="0.01"
                                min="0"
                                className="w-24 text-right"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <TextInput
                                value={String(coin.revenueValue || 0)}
                                onChange={(e) => handleCoinDataChange(coin.name, "revenueValue", e.target.value)}
                                type="number"
                                step="0.01"
                                min="0"
                                className="w-24 text-right"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {(!cryptoData.coinData || cryptoData.coinData.length === 0) && (
                      <Card className="p-4 text-center italic text-gray-500 dark:text-gray-400">
                        No coin data available. Update will create default coin data.
                      </Card>
                    )}
                  </div>
                </TabPanel>
                
                {/* Chart Data Tab - For simplicity, we'll leave this as a note */}
                <TabPanel>
                  <Card className="p-6 text-center">
                    <Text className="text-gray-600 dark:text-gray-400">
                      Chart data management is more complex and would require a date picker 
                      and multiple inputs per date. For simplicity, when you update the crypto data,
                      it will keep existing chart data or create default chart data if none exists.
                    </Text>
                  </Card>
                </TabPanel>
              </TabPanels>
            </TabGroup>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={updateCryptoData} 
                loading={isLoading} 
                size="lg"
                color="blue"
                className="shadow-lg"
              >
                Update Crypto Data
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}