-- CreateTable
CREATE TABLE "CryptoData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalProfit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalLoss" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentageEarned" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "recurringRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notifications" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CryptoData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinData" (
    "id" SERIAL NOT NULL,
    "cryptoDataId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "profitValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lossValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "revenueValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoinData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartData" (
    "id" SERIAL NOT NULL,
    "cryptoDataId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sol" DOUBLE PRECISION,
    "btc" DOUBLE PRECISION,
    "eth" DOUBLE PRECISION,
    "shib" DOUBLE PRECISION,
    "usdt" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChartData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CryptoData_userId_key" ON "CryptoData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CoinData_cryptoDataId_name_key" ON "CoinData"("cryptoDataId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ChartData_cryptoDataId_date_key" ON "ChartData"("cryptoDataId", "date");

-- AddForeignKey
ALTER TABLE "CryptoData" ADD CONSTRAINT "CryptoData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinData" ADD CONSTRAINT "CoinData_cryptoDataId_fkey" FOREIGN KEY ("cryptoDataId") REFERENCES "CryptoData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartData" ADD CONSTRAINT "ChartData_cryptoDataId_fkey" FOREIGN KEY ("cryptoDataId") REFERENCES "CryptoData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
