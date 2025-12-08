// // import prisma from '../config/database.js';


// // export const updateExpiredAuctions = async () => {
// //   try {
// //     const now = new Date();
    
// //     const expiredAuctions = await prisma.auctionItem.updateMany({
// //       where: {
// //         status: 'active',
// //         endsAt: {
// //           lte: now
// //         }
// //       },
// //       data: {
// //         status: 'closed'
// //       }
// //     });

// //     if (expiredAuctions.count > 0) {
// //       console.log(`✓ Closed ${expiredAuctions.count} expired auction(s) at ${now.toISOString()}`);
// //     }

// //     return expiredAuctions;
// //   } catch (error) {
// //     console.error('Error updating expired auctions:', error);
// //     throw error;
// //   }
// // };

// // export const initializeCombinedStatusChecker = (intervalMinutes = 1) => {
// //   const intervalMs = intervalMinutes * 60 * 1000;
  
// //   console.log(`🔄 Auction status checker initialized (Render-optimized)`);
// //   console.log(`   Checking every ${intervalMinutes} minute(s)`);
// //   console.log(`   Only closes ACTIVE auctions when time expires`);
  
// //   updateExpiredAuctions()
// //     .then(() => console.log('✓ Initial status check complete'))
// //     .catch(err => console.error('✗ Initial status check failed:', err));
  
// //   const interval = setInterval(() => {
// //     updateExpiredAuctions();
// //   }, intervalMs);

// //   process.on('SIGTERM', () => {
// //     console.log('Shutting down auction status checker...');
// //     clearInterval(interval);
// //   });

// //   return interval;
// // };

// // export const checkStatusesMiddleware = (req, res, next) => {
// //   updateExpiredAuctions().catch(err => 
// //     console.error('Background status update failed:', err)
// //   );
// //   next();
// // };

// // backend/src/services/auctionStatus.service.js

// import prisma from '../config/database.js';

// const createWinningTransaction = async (auction, highestBid) => {
//   try {
//     const buyer = await prisma.buyer.findUnique({
//       where: { userId: highestBid.buyerId }
//     });

//     if (!buyer) {
//       console.error(`Buyer record not found for user ${highestBid.buyerId}`);
//       return null;
//     }

//     const transaction = await prisma.transaction.create({
//       data: {
//         buyerId: buyer.id,
//         sellerId: auction.sellerId,
//         auctionItemId: auction.id,
//         amount: highestBid.bidAmount,
//         paymentMethod: 'cash', 
//         status: 'completed transaction'
//       }
//     });

//     console.log(`✓ Transaction created for auction ${auction.id} - Winner: ${highestBid.buyerId} - Amount: $${highestBid.bidAmount}`);
//     return transaction;
//   } catch (error) {
//     console.error('Error creating transaction:', error);
//     return null;
//   }
// };

// export const updateExpiredAuctions = async () => {
//   try {
//     const now = new Date();
    
//     const expiredAuctions = await prisma.auctionItem.findMany({
//       where: {
//         status: 'active',
//         endsAt: {
//           lte: now
//         }
//       },
//       include: {
//         bids: {
//           orderBy: { bidAmount: 'desc' },
//           take: 1,
//           include: {
//             buyer: {
//               select: {
//                 id: true,
//                 username: true
//               }
//             }
//           }
//         }
//       }
//     });

//     if (expiredAuctions.length === 0) {
//       return { count: 0 };
//     }

//     console.log(`Found ${expiredAuctions.length} expired auction(s) to close`);

//     let closedCount = 0;
//     let transactionsCreated = 0;

//     for (const auction of expiredAuctions) {
//       try {
//         await prisma.auctionItem.update({
//           where: { id: auction.id },
//           data: { status: 'closed' }
//         });
//         closedCount++;

//         if (auction.bids.length > 0) {
//           const highestBid = auction.bids[0];
//           const transaction = await createWinningTransaction(auction, highestBid);
//           if (transaction) {
//             transactionsCreated++;
//           }
//         } else {
//           console.log(`⚠ Auction ${auction.id} closed with no bids`);
//         }
//       } catch (error) {
//         console.error(`Error processing auction ${auction.id}:`, error);
//       }
//     }

//     console.log(`✓ Closed ${closedCount} expired auction(s) at ${now.toISOString()}`);
//     console.log(`✓ Created ${transactionsCreated} transaction(s) for winners`);

//     return { count: closedCount, transactionsCreated };
//   } catch (error) {
//     console.error('Error updating expired auctions:', error);
//     throw error;
//   }
// };

// export const initializeCombinedStatusChecker = (intervalMinutes = 1) => {
//   const intervalMs = intervalMinutes * 60 * 1000;
  
//   console.log(`🔄 Auction status checker initialized (Render-optimized)`);
//   console.log(`   Checking every ${intervalMinutes} minute(s)`);
//   console.log(`   Closes ACTIVE auctions and creates winner transactions`);
  
//   updateExpiredAuctions()
//     .then(() => console.log('✓ Initial status check complete'))
//     .catch(err => console.error('✗ Initial status check failed:', err));
  
//   const interval = setInterval(() => {
//     updateExpiredAuctions();
//   }, intervalMs);

//   process.on('SIGTERM', () => {
//     console.log('Shutting down auction status checker...');
//     clearInterval(interval);
//   });

//   return interval;
// };

// export const checkStatusesMiddleware = (req, res, next) => {
//   updateExpiredAuctions().catch(err => 
//     console.error('Background status update failed:', err)
//   );
//   next();
// };

// backend/src/services/auctionStatus.service.js
import prisma from '../config/database.js';

/**
 * Create transaction for winning bidder
 */
const createWinningTransaction = async (auction, highestBid) => {
  try {
    let buyer = await prisma.buyer.findUnique({
      where: { userId: highestBid.buyerId }
    });

    // if (!buyer) {
    //   console.log(`Creating Buyer record for user ${highestBid.buyerId}`);

    //   buyer = await prisma.buyer.create({
    //     data: {
    //       userId: highestBid.buyerId,
    //       rating: 0,
    //       purchaseCount: 0
    //     }
    //   });
    // }

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

export const updateExpiredAuctions = async () => {
  try {
    const now = new Date();
    
    const expiredAuctions = await prisma.auctionItem.findMany({
      where: {
        status: 'active',
        endsAt: {
          lte: now
        }
      },
      include: {
        bids: {
          orderBy: { bidAmount: 'desc' },
          take: 1,
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

    for (const auction of expiredAuctions) {
      try {
        await prisma.auctionItem.update({
          where: { id: auction.id },
          data: { status: 'closed' }
        });
        closedCount++;

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

export const initializeCombinedStatusChecker = (intervalMinutes = 1) => {
  const intervalMs = intervalMinutes * 60 * 1000;
  
  console.log(`🔄 Auction status checker initialized (Render-optimized)`);
  console.log(`   Checking every ${intervalMinutes} minute(s)`);
  console.log(`   Closes ACTIVE auctions and creates winner transactions`);
  
  updateExpiredAuctions()
    .then(() => console.log('✓ Initial status check complete'))
    .catch(err => console.error('✗ Initial status check failed:', err));
  
  const interval = setInterval(() => {
    updateExpiredAuctions();
  }, intervalMs);

  process.on('SIGTERM', () => {
    console.log('Shutting down auction status checker...');
    clearInterval(interval);
  });

  return interval;
};

export const checkStatusesMiddleware = (req, res, next) => {
  updateExpiredAuctions().catch(err => 
    console.error('Background status update failed:', err)
  );
  next();
};