/**
 * ============================================
 * auctionStatus.service.js
 * ============================================
 * Background service for managing auction lifecycle
 * Automatically closes expired auctions and creates transactions
 */

import prisma from '../config/database.js';

/**
 * Create transaction record for auction winner
 * Links buyer, seller, and auction with final bid amount
 */
const createWinningTransaction = async (auction, highestBid) => {
  try {
    // Fetch buyer profile
    let buyer = await prisma.buyer.findUnique({
      where: { userId: highestBid.buyerId }
    });

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        buyerId: buyer.id,
        sellerId: auction.sellerId,
        auctionItemId: auction.id,
        amount: highestBid.bidAmount,
        paymentMethod: 'confirmed', 
        status: 'completed'
      }
    });

    console.log(`✓ Transaction created for auction ${auction.id} - Winner: ${highestBid.buyer.username} - Amount: ${highestBid.bidAmount}`);
    return transaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    console.error('Auction:', auction.id);
    console.error('Highest bid:', highestBid);
    console.error('Full error:', error.message);
    return null;
  }
};

/**
 * Find and close all expired active auctions
 * Creates transaction records for auctions with winning bids
 */
export const updateExpiredAuctions = async () => {
  try {
    const now = new Date();
    
    // Find all active auctions past their end date
    const expiredAuctions = await prisma.auctionItem.findMany({
      where: {
        status: 'active',
        endsAt: {
          lte: now // Less than or equal to current time
        }
      },
      include: {
        bids: {
          orderBy: { bidAmount: 'desc' },
          take: 1, // Get highest bid only
          include: {
            buyer: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }
      }
    });

    if (expiredAuctions.length === 0) {
      return { count: 0 };
    }

    console.log(`Found ${expiredAuctions.length} expired auction(s) to close`);

    let closedCount = 0;
    let transactionsCreated = 0;

    // Process each expired auction
    for (const auction of expiredAuctions) {
      try {
        // Update auction status to closed
        await prisma.auctionItem.update({
          where: { id: auction.id },
          data: { status: 'closed' }
        });
        closedCount++;

        // Create transaction if auction has bids
        if (auction.bids.length > 0) {
          const highestBid = auction.bids[0];
          const transaction = await createWinningTransaction(auction, highestBid);
          if (transaction) {
            transactionsCreated++;
          }
        } else {
          console.log(`⚠ Auction ${auction.id} closed with no bids`);
        }
      } catch (error) {
        console.error(`Error processing auction ${auction.id}:`, error);
      }
    }

    console.log(`✓ Closed ${closedCount} expired auction(s) at ${now.toISOString()}`);
    console.log(`✓ Created ${transactionsCreated} transaction(s) for winners`);

    return { count: closedCount, transactionsCreated };
  } catch (error) {
    console.error('Error updating expired auctions:', error);
    throw error;
  }
};

/**
 * Initialize periodic auction status checker
 * Runs at specified interval to close expired auctions
 */
export const initializeCombinedStatusChecker = (intervalMinutes = 1) => {
  const intervalMs = intervalMinutes * 60 * 1000;
  
  console.log(`🔄 Auction status checker initialized (Render-optimized)`);
  console.log(`   Checking every ${intervalMinutes} minute(s)`);
  console.log(`   Closes ACTIVE auctions and creates winner transactions`);
  
  // Run immediately on startup
  updateExpiredAuctions()
    .then(() => console.log('✓ Initial status check complete'))
    .catch(err => console.error('✗ Initial status check failed:', err));
  
  // Schedule periodic checks
  const interval = setInterval(() => {
    updateExpiredAuctions();
  }, intervalMs);

  // Cleanup on shutdown
  process.on('SIGTERM', () => {
    console.log('Shutting down auction status checker...');
    clearInterval(interval);
  });

  return interval;
};

/**
 * Middleware to trigger status check on user activity
 * Updates expired auctions in background without blocking request
 */
export const checkStatusesMiddleware = (req, res, next) => {
  updateExpiredAuctions().catch(err => 
    console.error('Background status update failed:', err)
  );
  next();
};