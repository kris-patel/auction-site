/**
 * ============================================
 * database.js
 * ============================================
 * Prisma database client configuration
 */

import { PrismaClient } from '@prisma/client';

// Initialize Prisma client with logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

/**
 * Test and establish database connection
 * Exits process if connection fails
 */
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Gracefully disconnect on process exit
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;