import prisma from '../config/database.js';

// Add new function to get auctions with status filter
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

    const endDate = new Date(endsAt);
    if (endDate <= new Date()) {
      return res.status(400).json({ 
        error: 'End date must be in the future'
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
        status: 'pending'
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

// export const updateAuction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, category, status } = req.body;
//     const sellerId = req.user.id;

//     const auction = await prisma.auctionItem.findUnique({
//       where: { id }
//     });

//     if (!auction) {
//       return res.status(404).json({ error: 'Auction not found' });
//     }

//     if (auction.sellerId !== sellerId) {
//       return res.status(403).json({ 
//         error: 'You can only update your own auctions' 
//       });
//     }

//     const updateData = {
//       ...(title && { title }),
//       ...(description && { description }),
//       ...(category !== undefined && { category })
//     };

//     const updatedAuction = await prisma.auctionItem.update({
//       where: { id },
//       data: updateData,
//       include: {
//         images: true,
//         _count: {
//           select: {
//             bids: true
//           }
//         }
//       }
//     });

//     res.json({
//       message: 'Auction updated successfully',
//       auction: updatedAuction
//     });
//   } catch (error) {
//     console.error('Update auction error:', error);
//     res.status(500).json({ error: 'Failed to update auction' });
//   }
// };

export const updateAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, endsAt } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Fetch auction with bids count
    const auction = await prisma.auctionItem.findUnique({
      where: { id },
      include: {
        bids: true
      }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Authorization check: Sellers can only edit their own auctions, reps can edit any
    if (userRole === 'seller' && auction.sellerId !== userId) {
      return res.status(403).json({ 
        error: 'You can only update your own auctions' 
      });
    }

    // Prevent editing if auction has bids (business rule)
    if (auction.bids.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot edit auction with existing bids' 
      });
    }

    // Only allow editing pending auctions
    if (auction.status !== 'pending') {
      return res.status(400).json({ 
        error: 'Only pending auctions can be edited' 
      });
    }

    // Build update data object
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (endsAt) {
      const endDate = new Date(endsAt);
      if (endDate <= new Date()) {
        return res.status(400).json({ 
          error: 'End date must be in the future'
        });
      }
      updateData.endsAt = endDate;
    }

    // Update auction
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

// export const deleteAuction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const sellerId = req.user.id;

//     const auction = await prisma.auctionItem.findUnique({
//       where: { id },
//       include: {
//         bids: true
//       }
//     });

//     if (!auction) {
//       return res.status(404).json({ error: 'Auction not found' });
//     }

//     if (auction.sellerId !== sellerId) {
//       return res.status(403).json({ 
//         error: 'You can only delete your own auctions' 
//       });
//     }

//     if (auction.bids.length > 0) {
//       return res.status(400).json({ 
//         error: 'Cannot delete auction with existing bids' 
//       });
//     }

//     await prisma.auctionItem.delete({
//       where: { id }
//     });

//     res.json({ message: 'Auction deleted successfully' });
//   } catch (error) {
//     console.error('Delete auction error:', error);
//     res.status(500).json({ error: 'Failed to delete auction' });
//   }
// };

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

    // Sellers can only delete their own auctions, reps/admins can delete any
    if (userRole === 'seller' && auction.sellerId !== userId) {
      return res.status(403).json({ 
        error: 'You can only delete your own auctions' 
      });
    }

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