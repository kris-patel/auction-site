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

// CHANGES NEEDED TO auction.controller.js

// In createAuction function - REPLACE the date validation section:
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

    // ✅ FIXED: Parse the ISO date string properly
    const endDate = new Date(endsAt);
    const now = new Date();
    
    // Add 5 second buffer to account for network latency
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

// In updateAuction function - REPLACE the endsAt handling section:
// export const updateAuction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, category, endsAt } = req.body;
//     const userId = req.user.id;
//     const userRole = req.user.role;

//     const auction = await prisma.auctionItem.findUnique({
//       where: { id },
//       include: {
//         bids: true
//       }
//     });

//     if (!auction) {
//       return res.status(404).json({ error: 'Auction not found' });
//     }

//     if (userRole === 'seller' && auction.sellerId !== userId) {
//       return res.status(403).json({ 
//         error: 'You can only update your own auctions' 
//       });
//     }

//     if (auction.bids.length > 0) {
//       return res.status(400).json({ 
//         error: 'Cannot edit auction with existing bids' 
//       });
//     }

//     if (auction.status !== 'pending') {
//       return res.status(400).json({ 
//         error: 'Only pending auctions can be edited' 
//       });
//     }

//     const updateData = {};
//     if (title) updateData.title = title;
//     if (description) updateData.description = description;
//     if (category !== undefined) updateData.category = category;
    
//     // ✅ FIXED: Proper date validation
//     if (endsAt) {
//       const endDate = new Date(endsAt);
//       const now = new Date();
      
//       // Add 5 second buffer to account for network latency
//       const nowWithBuffer = new Date(now.getTime() - 5000);
      
//       if (endDate <= nowWithBuffer) {
//         return res.status(400).json({ 
//           error: 'End date must be in the future',
//           debug: {
//             received: endsAt,
//             parsed: endDate.toISOString(),
//             current: now.toISOString()
//           }
//         });
//       }
//       updateData.endsAt = endDate;
//     }

//     const updatedAuction = await prisma.auctionItem.update({
//       where: { id },
//       data: updateData,
//       include: {
//         seller: {
//           select: {
//             id: true,
//             username: true,
//             email: true
//           }
//         },
//         images: {
//           orderBy: {
//             displayOrder: 'asc'
//           }
//         },
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
    const { title, description, category, startingPrice, endsAt } = req.body; // ✅ ADD startingPrice here
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

    if (userRole === 'seller' && auction.sellerId !== userId) {
      return res.status(403).json({ 
        error: 'You can only update your own auctions' 
      });
    }

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

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    
    // ✅ ADD THIS: Handle startingPrice update
    if (startingPrice !== undefined) {
      const price = parseFloat(startingPrice);
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ 
          error: 'Starting price must be a positive number' 
        });
      }
      updateData.startingPrice = price;
      // Also update currentPrice if no bids exist
      if (auction.bids.length === 0) {
        updateData.currentPrice = price;
      }
    }
    
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