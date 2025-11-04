export function formatCryptoData(userData: any) {
  if (!userData) return null;

  const coinIcons: Record<string, string> = {
    'SOL': '🔵',
    'BTC': '🟠',
    'ETH': '🟣',
    'SHIB': '🟡',
    'USDT': '🟢',
  };

  const profitsByCoin = (userData.coinData || []).map((coin: any) => ({
    name: coin.name,
    value: coin.profitValue,
    icon: coinIcons[coin.name] || '💰'
  }));

  const lossesByCoin = (userData.coinData || [])
    .filter((coin: any) => coin.lossValue > 0)
    .map((coin: any) => ({ name: coin.name, value: coin.lossValue, icon: coinIcons[coin.name] || '💰' }));

  const revenueByCoin = (userData.coinData || []).map((coin: any) => ({
    name: coin.name,
    value: coin.revenueValue,
    icon: coinIcons[coin.name] || '💰'
  }));

  const chartData = (userData.chartData || []).map((entry: any) => ({
    date: entry.date instanceof Date ? entry.date.toISOString().split('T')[0] : new Date(entry.date).toISOString().split('T')[0],
    SOL: entry.sol || 0,
    BTC: entry.btc || 0,
    ETH: entry.eth || 0,
    SHIB: entry.shib || 0,
    USDT: entry.usdt || 0,
  }));

  const donutData = (userData.coinData || []).map((coin: any) => ({ name: coin.name, value: coin.profitValue > 0 ? coin.profitValue : 0 }));

  const lastUpdatedDate = userData.lastUpdated ? new Date(userData.lastUpdated) : new Date();
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60));
  const lastUpdated = diffInHours <= 1 ? 'Just now' : diffInHours < 24 ? `${diffInHours} hours ago` : `${Math.floor(diffInHours / 24)} days ago`;

  const formatChange = (value: number) => {
    return value ? `${value > 0 ? '+' : ''}${value.toFixed(1)}%` : '0%';
  };

  return {
    walletBalance: userData.walletBalance || 0,
    totalProfit: userData.totalProfit || 0,
    totalLoss: userData.totalLoss || 0,
    percentageEarned: userData.percentageEarned || 0,
    recurringRevenue: userData.recurringRevenue || 0,
    lastUpdated,
    profitsByCoin,
    lossesByCoin,
    revenueByCoin,
    chartData,
    donutData,
    notifications: userData.notifications || 0,
    walletBalanceChange: formatChange(userData.walletBalanceChange || 0),
    walletBalanceChangeType: userData.walletBalanceChangeType || 'positive',
    totalProfitChange: formatChange(userData.totalProfitChange || 0),
    totalProfitChangeType: userData.totalProfitChangeType || 'positive',
    totalLossChange: formatChange(userData.totalLossChange || 0),
    totalLossChangeType: userData.totalLossChangeType || 'negative',
    percentageEarnedChange: formatChange(userData.percentageEarnedChange || 0),
    percentageEarnedChangeType: userData.percentageEarnedChangeType || 'positive',
    recurringRevenueChange: formatChange(userData.recurringRevenueChange || 0),
    recurringRevenueChangeType: userData.recurringRevenueChangeType || 'positive'
  };
}
