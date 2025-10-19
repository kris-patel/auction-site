import prisma from '../config/database.js';

export const getActiveAuctions = async (req, res) => {
  try {
    const auctions = await prisma.auctionItem.findMany({
      where: {
        status: 'active',
        endsAt: {
          gte: new Date() // Only future auctions
        }
      },
      include: {
        seller: {
          select: {
            id: true,
            username: true
          }
        },
        bids: {
          orderBy: {
            bidAmount: 'desc'
          },
          take: 1,
          select: {
            bidAmount: true,
            timestamp: true,
            buyer: {
              select: {
                username: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ auctions });
  } catch (error) {
    console.error('Get auctions error:', error);
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
};

export const getAuctionById = async (req, res) => {
  try {
    const { id } = req.params;

    const auction = await prisma.auctionItem.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        bids: {
          orderBy: {
            bidAmount: 'desc'
          },
          include: {
            buyer: {
              select: {
                username: true
              }
            }
          }
        }
      }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    res.json({ auction });
  } catch (error) {
    console.error('Get auction error:', error);
    res.status(500).json({ error: 'Failed to fetch auction' });
  }
};

export const createAuction = async (req, res) => {
  try {
    const { title, description, category, startingPrice, endsAt } = req.body;
    const sellerId = req.user.id;

    // Validate input
    if (!title || !description || !startingPrice || !endsAt) {
      return res.status(400).json({ 
        error: 'Title, description, starting price, and end date are required' 
      });
    }

    // Validate end date is in the future
    const endDate = new Date(endsAt);
    if (endDate <= new Date()) {
      return res.status(400).json({ 
        error: 'End date must be in the future' 
      });
    }

    // Create auction
    const auction = await prisma.auctionItem.create({
      data: {
        title,
        description,
        category: category || null,
        startingPrice: parseFloat(startingPrice),
        currentPrice: parseFloat(startingPrice),
        endsAt: endDate,
        sellerId,
        status: 'active'
      },
      include: {
        seller: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Auction created successfully',
      auction
    });
  } catch (error) {
    console.error('Create auction error:', error);
    res.status(500).json({ error: 'Failed to create auction' });
  }
};

export const getMyAuctions = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const auctions = await prisma.auctionItem.findMany({
      where: { sellerId },
      include: {
        bids: {
          orderBy: {
            bidAmount: 'desc'
          },
          take: 5,
          select: {
            id: true,
            bidAmount: true,
            timestamp: true,
            buyer: {
              select: {
                username: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ auctions });
  } catch (error) {
    console.error('Get my auctions error:', error);
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
};

export const updateAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, status } = req.body;
    const sellerId = req.user.id;

    // Check if auction exists and belongs to seller
    const auction = await prisma.auctionItem.findUnique({
      where: { id }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    if (auction.sellerId !== sellerId) {
      return res.status(403).json({ 
        error: 'You can only update your own auctions' 
      });
    }

    // Update auction
    const updatedAuction = await prisma.auctionItem.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(category !== undefined && { category }),
        ...(status && { status })
      }
    });

    res.json({
      message: 'Auction updated successfully',
      auction: updatedAuction
    });
  } catch (error) {
    console.error('Update auction error:', error);
    res.status(500).json({ error: 'Failed to update auction' });
  }
};

export const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;

    // Check if auction exists and belongs to seller
    const auction = await prisma.auctionItem.findUnique({
      where: { id }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    if (auction.sellerId !== sellerId) {
      return res.status(403).json({ 
        error: 'You can only delete your own auctions' 
      });
    }

    // Delete auction (this will cascade delete bids)
    await prisma.auctionItem.delete({
      where: { id }
    });

    res.json({ message: 'Auction deleted successfully' });
  } catch (error) {
    console.error('Delete auction error:', error);
    res.status(500).json({ error: 'Failed to delete auction' });
  }
};