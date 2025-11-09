// // import prisma from '../config/database.js';

// // export const getActiveAuctions = async (req, res) => {
// //   try {
// //     const auctions = await prisma.auctionItem.findMany({
// //       where: {
// //         status: 'active',
// //         endsAt: {
// //           gte: new Date() // Only future auctions
// //         }
// //       },
// //       include: {
// //         seller: {
// //           select: { 
// //             id: true,
// //             username: true
// //           }
// //         },
// //         bids: {
// //           orderBy: {
// //             bidAmount: 'desc'
// //           },
// //           take: 1,
// //           select: {
// //             bidAmount: true,
// //             timestamp: true,
// //             buyer: {
// //               select: {
// //                 username: true
// //               }
// //             }
// //           }
// //         }
// //       },
// //       orderBy: {
// //         createdAt: 'desc'
// //       }
// //     });

// //     res.json({ auctions });
// //   } catch (error) {
// //     console.error('Get auctions error:', error);
// //     res.status(500).json({ error: 'Failed to fetch auctions' });
// //   }
// // };

// // export const getAuctionById = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     const auction = await prisma.auctionItem.findUnique({
// //       where: { id },
// //       include: {
// //         seller: {
// //           select: {
// //             id: true,
// //             username: true,
// //             email: true
// //           }
// //         },
// //         bids: {
// //           orderBy: {
// //             bidAmount: 'desc'
// //           },
// //           include: {
// //             buyer: {
// //               select: {
// //                 username: true
// //               }
// //             }
// //           }
// //         }
// //       }
// //     });

// //     if (!auction) {
// //       return res.status(404).json({ error: 'Auction not found' });
// //     }

// //     res.json({ auction });
// //   } catch (error) {
// //     console.error('Get auction error:', error);
// //     res.status(500).json({ error: 'Failed to fetch auction' });
// //   }
// // };

// // export const createAuction = async (req, res) => {
// //   try {
// //     const { title, description, category, startingPrice, endsAt } = req.body;
// //     const sellerId = req.user.id;

// //     // Validate input
// //     if (!title || !description || !startingPrice || !endsAt) {
// //       return res.status(400).json({ 
// //         error: 'Title, description, starting price, and end date are required' 
// //       });
// //     }

// //     // Validate end date is in the future
// //     const endDate = new Date(endsAt);
// //     if (endDate <= new Date()) {
// //       return res.status(400).json({ 
// //         error: 'End date must be in the future'
// //       });
// //     }

// //     // Create auction
// //     const auction = await prisma.auctionItem.create({
// //       data: {
// //         title,
// //         description,
// //         category: category || null,
// //         startingPrice: parseFloat(startingPrice),
// //         currentPrice: parseFloat(startingPrice),
// //         endsAt: endDate,
// //         sellerId,
// //         status: 'active'
// //       },
// //       include: {
// //         seller: {
// //           select: {
// //             id: true,
// //             username: true
// //           }
// //         }
// //       }
// //     });

// //     res.status(201).json({
// //       message: 'Auction created successfully',
// //       auction
// //     });
// //   } catch (error) {
// //     console.error('Create auction error:', error);
// //     res.status(500).json({ error: 'Failed to create auction' });
// //   }
// // };

// // export const getMyAuctions = async (req, res) => {
// //   try {
// //     const sellerId = req.user.id;
// //     // console.log(req.user.id)
// //     // const sellerId = 'cmgopazxu0001li69tb9sp53a';

// //     const auctions = await prisma.auctionItem.findMany({
// //       where: { sellerId },
// //       include: {
// //         bids: {
// //           orderBy: {
// //             bidAmount: 'desc'
// //           },
// //           take: 5,
// //           select: {
// //             id: true,
// //             bidAmount: true,
// //             timestamp: true,
// //             buyer: {
// //               select: {
// //                 username: true
// //               }
// //             }
// //           }
// //         }
// //       },
// //       orderBy: {
// //         createdAt: 'desc'
// //       }
// //     });

// //     console.log(auctions)

// //     res.json({ auctions });
// //   } catch (error) {
// //     console.error('Get my auctions error:', error);
// //     res.status(500).json({ error: 'Failed to fetch auctions' });
// //   }
// // };

// // export const updateAuction = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { title, description, category, status } = req.body;
// //     const sellerId = req.user.id;

// //     // Check if auction exists and belongs to seller
// //     const auction = await prisma.auctionItem.findUnique({
// //       where: { id }
// //     });

// //     if (!auction) {
// //       return res.status(404).json({ error: 'Auction not found' });
// //     }

// //     if (auction.sellerId !== sellerId) {
// //       return res.status(403).json({ 
// //         error: 'You can only update your own auctions' 
// //       });
// //     }

// //     // Update auction
// //     const updatedAuction = await prisma.auctionItem.update({
// //       where: { id },
// //       data: {
// //         ...(title && { title }),
// //         ...(description && { description }),
// //         ...(category !== undefined && { category }),
// //         ...(status && { status })
// //       }
// //     });

// //     res.json({
// //       message: 'Auction updated successfully',
// //       auction: updatedAuction
// //     });
// //   } catch (error) {
// //     console.error('Update auction error:', error);
// //     res.status(500).json({ error: 'Failed to update auction' });
// //   }
// // };

// // export const deleteAuction = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const sellerId = req.user.id;

// //     // Check if auction exists and belongs to seller
// //     const auction = await prisma.auctionItem.findUnique({
// //       where: { id }
// //     });

// //     if (!auction) {
// //       return res.status(404).json({ error: 'Auction not found' });
// //     }

// //     if (auction.sellerId !== sellerId) {
// //       return res.status(403).json({ 
// //         error: 'You can only delete your own auctions' 
// //       });
// //     }

// //     // Delete auction (this will cascade delete bids)
// //     await prisma.auctionItem.delete({
// //       where: { id }
// //     });

// //     res.json({ message: 'Auction deleted successfully' });
// //   } catch (error) {
// //     console.error('Delete auction error:', error);
// //     res.status(500).json({ error: 'Failed to delete auction' });
// //   }
// // };

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

// export const createAuction = async (req, res) => {
//   try {
//     const { title, description, category, startingPrice, endsAt, imageUrls } = req.body;
//     const sellerId = req.user.id;

//     // Validate input
//     if (!title || !description || !startingPrice || !endsAt) {
//       return res.status(400).json({ 
//         error: 'Title, description, starting price, and end date are required' 
//       });
//     }

//     // Validate end date is in the future
//     const endDate = new Date(endsAt);
//     if (endDate <= new Date()) {
//       return res.status(400).json({ 
//         error: 'End date must be in the future'
//       });
//     }

//     // Create auction with images in a transaction
//     const auction = await prisma.$transaction(async (tx) => {
//       // Create auction with pending status (requires admin approval)
//       const newAuction = await tx.auctionItem.create({
//         data: {
//           title,
//           description,
//           category: category || null,
//           startingPrice: parseFloat(startingPrice),
//           currentPrice: parseFloat(startingPrice),
//           endsAt: endDate,
//           sellerId,
//           status: 'pending' // Changed from 'active' to 'pending'
//         }
//       });

//       // Create images if provided
//       if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
//         await tx.auctionImage.createMany({
//           data: imageUrls.map((url, index) => ({
//             auctionId: newAuction.id,
//             imageUrl: url,
//             displayOrder: index,
//             isPrimary: index === 0
//           }))
//         });
//       }

//       // Fetch complete auction with relations
//       return await tx.auctionItem.findUnique({
//         where: { id: newAuction.id },
//         include: {
//           seller: {
//             select: {
//               id: true,
//               username: true
//             }
//           },
//           images: {
//             orderBy: {
//               displayOrder: 'asc'
//             }
//           }
//         }
//       });
//     });

//     res.status(201).json({
//       message: 'Auction created successfully and pending approval',
//       auction
//     });
//   } catch (error) {
//     console.error('Create auction error:', error);
//     res.status(500).json({ error: 'Failed to create auction' });
//   }
// };

export const getMyAuctions = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const auctions = await prisma.auctionItem.findMany({
      where: { sellerId },
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

    // Don't allow status changes once auction is active (only admin can close)
    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(category !== undefined && { category })
    };

    // Update auction
    const updatedAuction = await prisma.auctionItem.update({
      where: { id },
      data: updateData,
      include: {
        images: true,
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

export const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;

    // Check if auction exists and belongs to seller
    const auction = await prisma.auctionItem.findUnique({
      where: { id },
      include: {
        bids: true
      }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    if (auction.sellerId !== sellerId) {
      return res.status(403).json({ 
        error: 'You can only delete your own auctions' 
      });
    }

    // Don't allow deletion if there are bids
    if (auction.bids.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete auction with existing bids' 
      });
    }

    // Delete auction (this will cascade delete images due to onDelete: Cascade)
    await prisma.auctionItem.delete({
      where: { id }
    });

    res.json({ message: 'Auction deleted successfully' });
  } catch (error) {
    console.error('Delete auction error:', error);
    res.status(500).json({ error: 'Failed to delete auction' });
  }
};

// New function for admin to approve/activate auction
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

export const createAuction = async (req, res) => {
  try {
    console.log('Create auction request received');
    console.log('Body:', req.body);
    console.log('User:', req.user);

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

    console.log('Creating auction with data:', {
      title,
      description,
      category,
      startingPrice: parseFloat(startingPrice),
      endsAt: endDate,
      sellerId
    });

    // Create auction - status will be 'pending' by default (requires admin approval)
    const auction = await prisma.auctionItem.create({
      data: {
        title,
        description,
        category: category || null,
        startingPrice: parseFloat(startingPrice),
        currentPrice: parseFloat(startingPrice),
        endsAt: endDate,
        sellerId,
        status: 'pending' // Will need admin approval
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

    console.log('Auction created successfully:', auction);

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