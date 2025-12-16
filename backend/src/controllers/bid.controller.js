/**
 * Bid Controller
 * Handles bidding operations for active auctions
 */

import prisma from '../config/database.js';

/**
 * Place a bid on an auction
 * Validates bid amount, auction status, and updates current price
 */
export const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { bidAmount } = req.body;
    const buyerId = req.user.id;

    if (!bidAmount || bidAmount <= 0) {
      return res.status(400).json({ error: 'Valid bid amount is required' });
    }

    // Get auction with current highest bid
    const auction = await prisma.auctionItem.findUnique({
      where: { id: auctionId },
      include: {
        bids: {
          orderBy: {
            bidAmount: 'desc'
          },
          take: 1
        }
      }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Validate auction is active
    if (auction.status !== 'active') {
      return res.status(400).json({ error: 'Auction is not active' });
    }

    // Check if auction has ended
    if (new Date() > auction.endsAt) {
      return res.status(400).json({ error: 'Auction has ended' });
    }

    // Prevent seller from bidding on own auction
    if (auction.sellerId === buyerId) {
      return res.status(400).json({ 
        error: 'You cannot bid on your own auction' 
      });
    }

    // Validate bid is higher than current price
    if (parseFloat(bidAmount) <= auction.currentPrice) {
      return res.status(400).json({ 
        error: `Bid must be higher than current price of ${auction.currentPrice}` 
      });
    }

    // Check if user is already highest bidder
    const highestBid = await prisma.bid.findFirst({
      where: { auctionId },
      orderBy: { bidAmount: 'desc' },
      select: {
        buyerId: true,
        bidAmount: true
      }
    });

    if (highestBid && highestBid.buyerId === buyerId) {
      return res.status(400).json({ 
        error: 'You are already the highest bidder on this auction' 
      });
    }

    // Create bid and update auction current price in transaction
    const [bid, updatedAuction] = await prisma.$transaction([
      prisma.bid.create({
        data: {
          auctionId,
          buyerId,
          bidAmount: parseFloat(bidAmount)
        },
        include: {
          buyer: {
            select: {
              id: true,
              username: true
            }
          },
          auction: {
            select: {
              id: true,
              title: true
            }
          }
        }
      }),
      prisma.auctionItem.update({
        where: { id: auctionId },
        data: {
          currentPrice: parseFloat(bidAmount)
        }
      })
    ]);

    res.status(201).json({
      message: 'Bid placed successfully',
      bid
    });
  } catch (error) {
    console.error('Place bid error:', error);
    res.status(500).json({ error: 'Failed to place bid' });
  }
};

/**
 * Get all bids for a specific auction
 * Returns bids ordered by amount (highest first)
 */
export const getAuctionBids = async (req, res) => {
  try {
    const { auctionId } = req.params;

    const auction = await prisma.auctionItem.findUnique({
      where: { id: auctionId }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    const bids = await prisma.bid.findMany({
      where: { auctionId },
      include: {
        buyer: {
          select: {
            id: true,
            username: true
          }
        }
      },
      orderBy: {
        bidAmount: 'desc'
      }
    });

    res.json({ bids });
  } catch (error) {
    console.error('Get auction bids error:', error);
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
};

/**
 * Get all bids placed by authenticated buyer
 * Returns only latest bid per auction
 */
export const getMyBids = async (req, res) => {
  try {
    const buyerId = req.user.id;

    // Get all bids by buyer
    const allBids = await prisma.bid.findMany({
      where: { buyerId },
      include: {
        auction: {
          select: {
            id: true,
            title: true,
            currentPrice: true,
            endsAt: true,
            status: true,
            seller: {
              select: {
                username: true
              }
            }
          }
        }
      },
      orderBy: {
        timestamp: 'desc'
      }
    });

    // Keep only highest bid per auction
    const latestBidsMap = new Map();
    
    allBids.forEach(bid => {
      const auctionId = bid.auctionId;
      const existingBid = latestBidsMap.get(auctionId);
      
      if (!existingBid || bid.bidAmount > existingBid.bidAmount) {
        latestBidsMap.set(auctionId, bid);
      }
    });

    const latestBids = Array.from(latestBidsMap.values()).sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    res.json({ bids: latestBids });
  } catch (error) {
    console.error('Get my bids error:', error);
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
};