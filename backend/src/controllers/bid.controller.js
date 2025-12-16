import prisma from '../config/database.js';

export const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { bidAmount } = req.body;
    const buyerId = req.user.id;

    if (!bidAmount || bidAmount <= 0) {
      return res.status(400).json({ error: 'Valid bid amount is required' });
    }

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

    if (auction.status !== 'active') {
      return res.status(400).json({ error: 'Auction is not active' });
    }

    if (new Date() > auction.endsAt) {
      return res.status(400).json({ error: 'Auction has ended' });
    }

    if (auction.sellerId === buyerId) {
      return res.status(400).json({ 
        error: 'You cannot bid on your own auction' 
      });
    }

    if (parseFloat(bidAmount) <= auction.currentPrice) {
      return res.status(400).json({ 
        error: `Bid must be higher than current price of ${auction.currentPrice}` 
      });
    }

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

export const getMyBids = async (req, res) => {
  try {
    const buyerId = req.user.id;

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