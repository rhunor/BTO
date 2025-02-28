// lib/db.ts
import { PrismaClient } from '@prisma/client'

// This prevents this code from being imported on the client side
export const dynamic = 'force-dynamic'

// Mark this file as server-only
export const runtime = 'nodejs'

// Creating a singleton instance of PrismaClient
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const db = 
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db