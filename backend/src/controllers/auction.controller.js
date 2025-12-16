/**
 * Auction Controller
 * Handles auction CRUD operations and lifecycle management
 */

import prisma from '../config/database.js';

/**
 * Get auctions filtered by status (active/pending/completed)
 */
export const getAuctionsByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const now = new Date();

    console.log(status)

    let whereClause = {};

    if (status === 'active') {
      whereClause = {
        status: 'active',
        endsAt: { gte: now }
      };
    } else if (status === 'pending') {
      whereClause = {
        status: 'pending'
      };
    } else if (status === 'completed') {
      whereClause = {
        OR: [
          { status: 'closed' },
          {
            status: 'active',
            endsAt: { lt: now }
          }
        ]
      };
    }

    const auctions = await prisma.auctionItem.findMany({
      where: whereClause,
      include: {
        seller: {
          select: { 
            id: true,
            username: true,
            email: true
          }
        },
        images: {
          where: { isPrimary: true },
          take: 1
        },
        bids: {
          orderBy: { bidAmount: 'desc' },
          take: 1,
          select: {
            bidAmount: true,
            timestamp: true,
            buyer: {
              select: { username: true }
            }
          }
        },
        _count: {
          select: { bids: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ auctions });
  } catch (error) {
    console.error('Get auctions by status error:', error);
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
};

/**
 * Get all active (non-expired) auctions
 */
export const getActiveAuctions = async (req, res) => {
  try {
    const auctions = await prisma.auctionItem.findMany({
      where: {
        status: 'active',
        endsAt: {
          gte: new Date()
        }
      },
      include: {
        seller: {
          select: { 
            id: true,
            username: true,
            email: true
          }
        },
        images: {
          where: {
            isPrimary: true
          },
          take: 1
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
        },
        _count: {
          select: { bids: true }
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

/**
 * Get single auction by ID with full details
 */
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
            email: true,
            profileImage: true
          }
        },
        images: {
          orderBy: {
            displayOrder: 'asc'
          }
        },
        bids: {
          orderBy: {
            bidAmount: 'desc'
          },
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

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    res.json({ auction });
  } catch (error) {
    console.error('Get auction error:', error);
    res.status(500).json({ error: 'Failed to fetch auction' });
  }
};

/**
 * Get all auctions created by authenticated seller
 */
export const getMyAuctions = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { status } = req.query;
    const now = new Date();

    let whereClause = { sellerId };

    // Add status filtering
    if (status === 'active') {
      whereClause.status = 'active';
      whereClause.endsAt = { gte: now };
    } else if (status === 'pending') {
      whereClause.status = 'pending';
    } else if (status === 'completed') {
      whereClause.OR = [
        { status: 'closed' },
        {
          status: 'active',
          endsAt: { lt: now }
        }
      ];
    }

    const auctions = await prisma.auctionItem.findMany({
      where: whereClause,
      include: {
        images: {
          where: {
            isPrimary: true
          },
          take: 1
        },
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
        },
        _count: {
          select: {
            bids: true
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

/**
 * Delete auction (only if no bids exist)
 * Sellers can delete own auctions, reps/admins can delete any
 */
export const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const auction = await prisma.auctionItem.findUnique({
      where: { id },
      include: {
        bids: true
      }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Check ownership for sellers
    if (userRole === 'seller' && auction.sellerId !== userId) {
      return res.status(403).json({ 
        error: 'You can only delete your own auctions' 
      });
    }

    // Prevent deletion if bids exist
    if (auction.bids.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete auction with existing bids' 
      });
    }

    await prisma.auctionItem.delete({
      where: { id }
    });

    res.json({ message: 'Auction deleted successfully' });
  } catch (error) {
    console.error('Delete auction error:', error);
    res.status(500).json({ error: 'Failed to delete auction' });
  }
};

/**
 * Approve pending auction (rep/admin only)
 */
export const approveAuction = async (req, res) => {
  try {
    const { id } = req.params;

    const auction = await prisma.auctionItem.findUnique({
      where: { id }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    if (auction.status !== 'pending') {
      return res.status(400).json({ 
        error: 'Only pending auctions can be approved' 
      });
    }

    const updatedAuction = await prisma.auctionItem.update({
      where: { id },
      data: { status: 'active' },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: 'Auction approved and activated',
      auction: updatedAuction
    });
  } catch (error) {
    console.error('Approve auction error:', error);
    res.status(500).json({ error: 'Failed to approve auction' });
  }
};

/**
 * Create new auction (status: pending, awaiting approval)
 */
export const createAuction = async (req, res) => {
  try {
    console.log('Create auction request received');
    const { title, description, category, startingPrice, endsAt } = req.body;
    const sellerId = req.user.id;

    if (!title || !description || !startingPrice || !endsAt) {
      return res.status(400).json({ 
        error: 'Title, description, starting price, and end date are required' 
      });
    }

    // Parse and validate end date
    const endDate = new Date(endsAt);
    const now = new Date();
    
    // Add buffer to account for network latency
    const nowWithBuffer = new Date(now.getTime() - 5000);
    
    if (endDate <= nowWithBuffer) {
      return res.status(400).json({ 
        error: 'End date must be in the future',
        debug: {
          received: endsAt,
          parsed: endDate.toISOString(),
          current: now.toISOString(),
          comparison: endDate <= now
        }
      });
    }

    const auction = await prisma.auctionItem.create({
      data: {
        title,
        description,
        category: category || null,
        startingPrice: parseFloat(startingPrice),
        currentPrice: parseFloat(startingPrice),
        endsAt: endDate,
        sellerId,
        status: 'pending' // Requires admin/rep approval
      },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Auction created successfully and pending approval',
      auction
    });
  } catch (error) {
    console.error('Create auction error:', error);
    res.status(500).json({ 
      error: 'Failed to create auction',
      details: error.message 
    });
  }
};

/**
 * Update pending auction (only if no bids exist)
 */
export const updateAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, startingPrice, endsAt } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const auction = await prisma.auctionItem.findUnique({
      where: { id },
      include: {
        bids: true
      }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Check ownership for sellers
    if (userRole === 'seller' && auction.sellerId !== userId) {
      return res.status(403).json({ 
        error: 'You can only update your own auctions' 
      });
    }

    // Only allow editing pending auctions without bids
    if (auction.bids.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot edit auction with existing bids' 
      });
    }

    if (auction.status !== 'pending') {
      return res.status(400).json({ 
        error: 'Only pending auctions can be edited' 
      });
    }

    // Build update object
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    
    // Handle starting price update
    if (startingPrice !== undefined) {
      const price = parseFloat(startingPrice);
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ 
          error: 'Starting price must be a positive number' 
        });
      }
      updateData.startingPrice = price;
      if (auction.bids.length === 0) {
        updateData.currentPrice = price;
      }
    }
    
    // Handle end date update
    if (endsAt) {
      const endDate = new Date(endsAt);
      const now = new Date();
      const nowWithBuffer = new Date(now.getTime() - 5000);
      
      if (endDate <= nowWithBuffer) {
        return res.status(400).json({ 
          error: 'End date must be in the future',
          debug: {
            received: endsAt,
            parsed: endDate.toISOString(),
            current: now.toISOString()
          }
        });
      }
      updateData.endsAt = endDate;
    }

    const updatedAuction = await prisma.auctionItem.update({
      where: { id },
      data: updateData,
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        images: {
          orderBy: {
            displayOrder: 'asc'
          }
        },
        _count: {
          select: {
            bids: true
          }
        }
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