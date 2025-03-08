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
} from '@tremor/react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [cryptoData, setCryptoData] = useState({
    walletBalance: 0,
    totalProfit: 0,
    totalLoss: 0,
    percentageEarned: 0,
    recurringRevenue: 0,
    notifications: 0,
    // Add change values
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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  
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
  
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      
      const data = await response.json();
      setUsers(data);
      setMessage({ type: "", text: "" });
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage({ type: "error", text: "Failed to fetch users" });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch crypto data for selected user
  const fetchUserCryptoData = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/crypto-data/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch crypto data");
      
      const data = await response.json();
      setCryptoData(data);
      setSelectedUser(users.find(user => user.id === userId));
      setMessage({ type: "", text: "" });
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setMessage({ type: "error", text: "Failed to fetch user crypto data" });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update crypto data
  const updateCryptoData = async () => {
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
      
      setMessage({ type: "success", text: "Crypto data updated successfully" });
      
      // Refresh the data
      fetchUserCryptoData(selectedUser.id);
    } catch (error) {
      console.error("Error updating crypto data:", error);
      setMessage({ type: "error", text: "Failed to update crypto data" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes for main metrics
  const handleInputChange = (name, value) => {
    setCryptoData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };
  
  // Handle form input changes for string values
  const handleStringInputChange = (name, value) => {
    setCryptoData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form input changes for coin data
  const handleCoinDataChange = (coinName, field, value) => {
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
  const createAdminUsersAPI = async () => {
    // For demo purposes, we'll just fetch and show a success message
    setMessage({ type: "info", text: "This would create the admin/users API endpoint" });
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
        
        {/* Status Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-md ${
            message.type === "error" 
              ? "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200" 
              : message.type === "success"
                ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                : "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200"
          }`}>
            {message.text}
          </div>
          
        )}
        
        <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
          {/* Left Column - User Selection */}
          <Card>
            <Title>Manage User Crypto Data</Title>
            <Text className="mt-2">Select a user to manage their crypto data</Text>
        
            {/* User Selection */}
            <div className="mt-6">
              <Text>Select User</Text>
              <Select
                className="mt-2"
                placeholder="Select a user"
                disabled={isLoading || users.length === 0}
                onValueChange={(value) => {
                  const userId = parseInt(value);
                  fetchUserCryptoData(userId);
                }}
              >
                {users.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)}>
                    {user.firstName} {user.lastName} ({user.email})
                  </SelectItem>
                ))}
              </Select>
              
              <div className="mt-4 flex gap-4">
                <Button onClick={fetchUsers} loading={isLoading} color="blue">
                  Refresh Users
                </Button>
                <Button onClick={createAdminUsersAPI} color="indigo">
                  Create Admin API
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Right Column - Current User Stats */}
          <Card>
            <Title>Current User</Title>
            {selectedUser ? (
              <div className="mt-4">
                <Flex>
                  <div>
                    <Text>User ID</Text>
                    <Metric>{selectedUser.id}</Metric>
                  </div>
                </Flex>
                <div className="mt-4">
                  <Text>Name</Text>
                  <Text className="font-medium">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </Text>
                </div>
                <div className="mt-2">
                  <Text>Email</Text>
                  <Text className="font-medium">{selectedUser.email}</Text>
                </div>
              </div>
            ) : (
              <Text className="mt-4 italic text-gray-500 dark:text-gray-400">
                No user selected
              </Text>
            )}
          </Card>
        </Grid>

        {/* Crypto Data Management */}
        {selectedUser && (
          <Card className="mt-6">
            <Title>Manage Crypto Data</Title>
            <Text className="mt-2">
              Update the crypto data for {selectedUser.firstName} {selectedUser.lastName}
            </Text>
            
            <TabGroup className="mt-6">
              <TabList>
                <Tab>Main Metrics</Tab>
                <Tab>Change Values</Tab>
                <Tab>Coin Data</Tab>
                <Tab>Chart Data</Tab>
              </TabList>
              
              <TabPanels>
                {/* Main Metrics Tab */}
                <TabPanel>
                  <div className="mt-6 space-y-6">
                    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                      <div>
                        <Text>Wallet Balance</Text>
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
                      </div>
                      
                      <div>
                        <Text>Total Profit</Text>
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
                      </div>
                      
                      <div>
                        <Text>Total Loss</Text>
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
                      </div>
                      
                      <div>
                        <Text>Percentage Earned</Text>
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
                      </div>
                      
                      <div>
                        <Text>Recurring Revenue</Text>
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
                      </div>
                      
                      <div>
                        <Text>Notifications</Text>
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
                      </div>
                    </Grid>
                  </div>
                </TabPanel>
                
                {/* Change Values Tab */}
                <TabPanel>
                  <div className="mt-6 space-y-6">
                    <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
                      {/* Wallet Balance Change */}
                      <Card className="p-4">
                        <Title>Wallet Balance</Title>
                        <Grid numItemsSm={1} numItemsLg={2} className="gap-6 mt-4">
                          <div>
                            <Text>Change Percentage</Text>
                            <TextInput
                              value={String(cryptoData.walletBalanceChange || 0)}
                              onChange={(e) => handleInputChange("walletBalanceChange", e.target.value)}
                              placeholder="Enter change percentage"
                              type="number"
                              step="0.1"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Text>Change Type</Text>
                            <Select
                              value={cryptoData.walletBalanceChangeType}
                              onValueChange={(value) => handleStringInputChange("walletBalanceChangeType", value)}
                              className="mt-2"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </div>
                        </Grid>
                      </Card>
                      
                      {/* Total Profit Change */}
                      <Card className="p-4">
                        <Title>Total Profit</Title>
                        <Grid numItemsSm={1} numItemsLg={2} className="gap-6 mt-4">
                          <div>
                            <Text>Change Percentage</Text>
                            <TextInput
                              value={String(cryptoData.totalProfitChange || 0)}
                              onChange={(e) => handleInputChange("totalProfitChange", e.target.value)}
                              placeholder="Enter change percentage"
                              type="number"
                              step="0.1"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Text>Change Type</Text>
                            <Select
                              value={cryptoData.totalProfitChangeType}
                              onValueChange={(value) => handleStringInputChange("totalProfitChangeType", value)}
                              className="mt-2"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </div>
                        </Grid>
                      </Card>
                      
                      {/* Total Loss Change */}
                      <Card className="p-4">
                        <Title>Total Loss</Title>
                        <Grid numItemsSm={1} numItemsLg={2} className="gap-6 mt-4">
                          <div>
                            <Text>Change Percentage</Text>
                            <TextInput
                              value={String(cryptoData.totalLossChange || 0)}
                              onChange={(e) => handleInputChange("totalLossChange", e.target.value)}
                              placeholder="Enter change percentage"
                              type="number"
                              step="0.1"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Text>Change Type</Text>
                            <Select
                              value={cryptoData.totalLossChangeType}
                              onValueChange={(value) => handleStringInputChange("totalLossChangeType", value)}
                              className="mt-2"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </div>
                        </Grid>
                      </Card>
                      
                      {/* Percentage Earned Change */}
                      <Card className="p-4">
                        <Title>Percentage Earned</Title>
                        <Grid numItemsSm={1} numItemsLg={2} className="gap-6 mt-4">
                          <div>
                            <Text>Change Percentage</Text>
                            <TextInput
                              value={String(cryptoData.percentageEarnedChange || 0)}
                              onChange={(e) => handleInputChange("percentageEarnedChange", e.target.value)}
                              placeholder="Enter change percentage"
                              type="number"
                              step="0.1"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Text>Change Type</Text>
                            <Select
                              value={cryptoData.percentageEarnedChangeType}
                              onValueChange={(value) => handleStringInputChange("percentageEarnedChangeType", value)}
                              className="mt-2"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </div>
                        </Grid>
                      </Card>
                      
                      {/* Recurring Revenue Change */}
                      <Card className="p-4">
                        <Title>Recurring Revenue</Title>
                        <Grid numItemsSm={1} numItemsLg={2} className="gap-6 mt-4">
                          <div>
                            <Text>Change Percentage</Text>
                            <TextInput
                              value={String(cryptoData.recurringRevenueChange || 0)}
                              onChange={(e) => handleInputChange("recurringRevenueChange", e.target.value)}
                              placeholder="Enter change percentage"
                              type="number"
                              step="0.1"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Text>Change Type</Text>
                            <Select
                              value={cryptoData.recurringRevenueChangeType}
                              onValueChange={(value) => handleStringInputChange("recurringRevenueChangeType", value)}
                              className="mt-2"
                            >
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </Select>
                          </div>
                        </Grid>
                      </Card>
                    </Grid>
                  </div>
                </TabPanel>
                
                {/* Coin Data Tab */}
                <TabPanel>
                  <div className="mt-6 space-y-6">
                    {cryptoData.coinData && cryptoData.coinData.map((coin, index) => (
                      <Card key={index} className="p-4">
                        <Title>{coin.name}</Title>
                        <Grid numItemsSm={1} numItemsLg={3} className="gap-6 mt-4">
                          <div>
                            <Text>Profit Value</Text>
                            <TextInput
                              value={String(coin.profitValue || 0)}
                              onChange={(e) => handleCoinDataChange(coin.name, "profitValue", e.target.value)}
                              placeholder="Enter profit value"
                              type="number"
                              step="0.01"
                              min="0"
                              className="mt-2"
                            />
                          </div>
                          
                          <div>
                            <Text>Loss Value</Text>
                            <TextInput
                              value={String(coin.lossValue || 0)}
                              onChange={(e) => handleCoinDataChange(coin.name, "lossValue", e.target.value)}
                              placeholder="Enter loss value"
                              type="number"
                              step="0.01"
                              min="0"
                              className="mt-2"
                            />
                          </div>
                          
                          <div>
                            <Text>Revenue Value</Text>
                            <TextInput
                              value={String(coin.revenueValue || 0)}
                              onChange={(e) => handleCoinDataChange(coin.name, "revenueValue", e.target.value)}
                              placeholder="Enter revenue value"
                              type="number"
                              step="0.01"
                              min="0"
                              className="mt-2"
                            />
                          </div>
                        </Grid>
                      </Card>
                    ))}
                    
                    {(!cryptoData.coinData || cryptoData.coinData.length === 0) && (
                      <Text className="italic text-gray-500 dark:text-gray-400">
                        No coin data available. Update will create default coin data.
                      </Text>
                    )}
                  </div>
                </TabPanel>
                
                {/* Chart Data Tab - For simplicity, we'll leave this as a note */}
                <TabPanel>
                  <div className="mt-6">
                    <Text>
                      Chart data management is more complex and would require a date picker 
                      and multiple inputs per date. For simplicity, when you update the crypto data,
                      it will keep existing chart data or create default chart data if none exists.
                    </Text>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={updateCryptoData} 
                loading={isLoading} 
                size="lg"
                color="blue"
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