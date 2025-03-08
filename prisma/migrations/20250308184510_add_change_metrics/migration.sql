-- AlterTable
ALTER TABLE "CryptoData" ADD COLUMN     "percentageEarnedChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "percentageEarnedChangeType" TEXT NOT NULL DEFAULT 'positive',
ADD COLUMN     "recurringRevenueChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "recurringRevenueChangeType" TEXT NOT NULL DEFAULT 'positive',
ADD COLUMN     "totalLossChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalLossChangeType" TEXT NOT NULL DEFAULT 'negative',
ADD COLUMN     "totalProfitChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalProfitChangeType" TEXT NOT NULL DEFAULT 'positive',
ADD COLUMN     "walletBalanceChange" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "walletBalanceChangeType" TEXT NOT NULL DEFAULT 'positive';
