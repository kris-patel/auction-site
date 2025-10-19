import prisma from '../config/database.js';

export const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { bidAmount } = req.body;
    const buyerId = req.user.id;

    // Validate bid amount
    if (!bidAmount || bidAmount <= 0) {
      return res.status(400).json({ error: 'Valid bid amount is required' });
    }

    // Get auction details
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

    // Check if auction is active
    if (auction.status !== 'active') {
      return res.status(400).json({ error: 'Auction is not active' });
    }

    // Check if auction has ended
    if (new Date() > auction.endsAt) {
      return res.status(400).json({ error: 'Auction has ended' });
    }

    // Check if buyer is trying to bid on their own auction
    if (auction.sellerId === buyerId) {
      return res.status(400).json({ 
        error: 'You cannot bid on your own auction' 
      });
    }

    // Check if bid is higher than current price
    if (parseFloat(bidAmount) <= auction.currentPrice) {
      return res.status(400).json({ 
        error: `Bid must be higher than current price of $${auction.currentPrice}` 
      });
    }

    // Create bid and update auction current price in a transaction
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

    // Check if auction exists
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

    const bids = await prisma.bid.findMany({
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

    res.json({ bids });
  } catch (error) {
    console.error('Get my bids error:', error);
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
};