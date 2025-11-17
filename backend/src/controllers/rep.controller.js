// // import prisma from '../config/database.js';
// // import { hashPassword } from '../utils/bcrypt.js';

// // export const getAllUsers = async (req, res) => {
// //   try {
// //     const users = await prisma.user.findMany({
// //       select: {
// //         id: true,
// //         username: true,
// //         email: true,
// //         role: true,
// //         isActive: true,
// //         createdAt: true
// //       },
// //       orderBy: {
// //         createdAt: 'desc'
// //       }
// //     });

// //     res.json({ users });
// //   } catch (error) {
// //     console.error('Get all users error:', error);
// //     res.status(500).json({ error: 'Failed to fetch users' });
// //   }
// // };

// // export const resetPassword = async (req, res) => {
// //   try {
// //     const { userId } = req.params;
// //     const { newPassword } = req.body;

// //     // Validate input
// //     if (!newPassword) {
// //       return res.status(400).json({ error: 'New password is required' });
// //     }

// //     if (newPassword.length < 6) {
// //       return res.status(400).json({ 
// //         error: 'Password must be at least 6 characters long' 
// //       });
// //     }

// //     // Check if user exists
// //     const user = await prisma.user.findUnique({
// //       where: { id: userId }
// //     });

// //     if (!user) {
// //       return res.status(404).json({ error: 'User not found' });
// //     }

// //     // Hash new password
// //     const hashedPassword = await hashPassword(newPassword);

// //     // Update password
// //     await prisma.user.update({
// //       where: { id: userId },
// //       data: { password: hashedPassword }
// //     });

// //     res.json({ message: 'Password reset successfully' });
// //   } catch (error) {
// //     console.error('Reset password error:', error);
// //     res.status(500).json({ error: 'Failed to reset password' });
// //   }
// // };

// // export const deleteAuction = async (req, res) => {
// //   try {
// //     const { auctionId } = req.params;

// //     // Check if auction exists
// //     const auction = await prisma.auctionItem.findUnique({
// //       where: { id: auctionId }
// //     });

// //     if (!auction) {
// //       return res.status(404).json({ error: 'Auction not found' });
// //     }

// //     // Delete auction
// //     await prisma.auctionItem.delete({
// //       where: { id: auctionId }
// //     });

// //     res.json({ message: 'Auction deleted successfully' });
// //   } catch (error) {
// //     console.error('Delete auction error:', error);
// //     res.status(500).json({ error: 'Failed to delete auction' });
// //   }
// // };

// // export const getUserDetails = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const user = await prisma.user.findUnique({
// //       where: { id: userId },
// //       select: {
// //         id: true,
// //         username: true,
// //         email: true,
// //         role: true,
// //         isActive: true,
// //         createdAt: true,
// //         auctions: {
// //           select: {
// //             id: true,
// //             title: true,
// //             status: true,
// //             currentPrice: true,
// //             createdAt: true
// //           }
// //         },
// //         bids: {
// //           select: {
// //             id: true,
// //             bidAmount: true,
// //             timestamp: true,
// //             auction: {
// //               select: {
// //                 id: true,
// //                 title: true
// //               }
// //             }
// //           }
// //         }
// //       }
// //     });

// //     if (!user) {
// //       return res.status(404).json({ error: 'User not found' });
// //     }

// //     res.json({ user });
// //   } catch (error) {
// //     console.error('Get user details error:', error);
// //     res.status(500).json({ error: 'Failed to fetch user details' });
// //   }
// // };

// import prisma from '../config/database.js';
// import { hashPassword } from '../utils/bcrypt.js';

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         isActive: true,
//         createdAt: true
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     res.json({ users });
//   } catch (error) {
//     console.error('Get all users error:', error);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// };

// export const getAllAuctions = async (req, res) => {
//   try {
//     const auctions = await prisma.auctionItem.findMany({
//       include: {
//         seller: {
//           select: {
//             id: true,
//             username: true,
//             email: true
//           }
//         },
//         _count: {
//           select: {
//             bids: true
//           }
//         }
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     res.json({ auctions });
//   } catch (error) {
//     console.error('Get all auctions error:', error);
//     res.status(500).json({ error: 'Failed to fetch auctions' });
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { newPassword } = req.body;

//     // Validate input
//     if (!newPassword) {
//       return res.status(400).json({ error: 'New password is required' });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({ 
//         error: 'Password must be at least 6 characters long' 
//       });
//     }

//     // Check if user exists
//     const user = await prisma.user.findUnique({
//       where: { id: userId }
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Hash new password
//     const hashedPassword = await hashPassword(newPassword);

//     // Update password
//     await prisma.user.update({
//       where: { id: userId },
//       data: { password: hashedPassword }
//     });

//     res.json({ message: 'Password reset successfully' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ error: 'Failed to reset password' });
//   }
// };

// export const deleteAuction = async (req, res) => {
//   try {
//     const { auctionId } = req.params;

//     // Check if auction exists
//     const auction = await prisma.auctionItem.findUnique({
//       where: { id: auctionId }
//     });

//     if (!auction) {
//       return res.status(404).json({ error: 'Auction not found' });
//     }

//     // Delete auction
//     await prisma.auctionItem.delete({
//       where: { id: auctionId }
//     });

//     res.json({ message: 'Auction deleted successfully' });
//   } catch (error) {
//     console.error('Delete auction error:', error);
//     res.status(500).json({ error: 'Failed to delete auction' });
//   }
// };

// export const getUserDetails = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         isActive: true,
//         createdAt: true,
//         auctions: {
//           select: {
//             id: true,
//             title: true,
//             status: true,
//             currentPrice: true,
//             createdAt: true
//           }
//         },
//         bids: {
//           select: {
//             id: true,
//             bidAmount: true,
//             timestamp: true,
//             auction: {
//               select: {
//                 id: true,
//                 title: true
//               }
//             }
//           }
//         }
//       }
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ user });
//   } catch (error) {
//     console.error('Get user details error:', error);
//     res.status(500).json({ error: 'Failed to fetch user details' });
//   }
// };

import prisma from '../config/database.js';
import { hashPassword } from '../utils/bcrypt.js';

export const getAllUsers = async (req, res) => {
  try {
    const { role, isActive } = req.query;

    const where = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profileImage: true,
        isActive: true,
        createdAt: true,
        // Include role-specific data
        buyer: {
          select: {
            rating: true,
            purchaseCount: true,
            preferredCategory: true
          }
        },
        representative: {
          select: {
            region: true,
            activeAuctions: true,
            customersHandled: true
          }
        },
        _count: {
          select: {
            auctions: true,
            bids: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getAllAuctions = async (req, res) => {
  try {
    const { status } = req.query;

    const where = {};
    if (status) where.status = status;

    const auctions = await prisma.auctionItem.findMany({
      where,
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
    console.error('Get all auctions error:', error);
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    // Validate input
    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

export const deleteAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;

    // Check if auction exists
    const auction = await prisma.auctionItem.findUnique({
      where: { id: auctionId },
      include: {
        bids: true
      }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    // Reps can delete any auction (even with bids) for moderation purposes
    // Delete auction (this will cascade delete images and bids)
    await prisma.auctionItem.delete({
      where: { id: auctionId }
    });

    res.json({ 
      message: 'Auction deleted successfully',
      deletedBids: auction.bids.length 
    });
  } catch (error) {
    console.error('Delete auction error:', error);
    res.status(500).json({ error: 'Failed to delete auction' });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profileImage: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        // Role-specific data
        buyer: {
          select: {
            rating: true,
            purchaseCount: true,
            preferredCategory: true
          }
        },
        representative: {
          select: {
            region: true,
            activeAuctions: true,
            customersHandled: true
          }
        },
        admin: {
          select: {
            adminLevel: true,
            assignedReps: true
          }
        },
        // Related data
        auctions: {
          select: {
            id: true,
            title: true,
            status: true,
            currentPrice: true,
            createdAt: true,
            endsAt: true,
            _count: {
              select: {
                bids: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        bids: {
          select: {
            id: true,
            bidAmount: true,
            timestamp: true,
            auction: {
              select: {
                id: true,
                title: true,
                status: true,
                currentPrice: true
              }
            }
          },
          orderBy: {
            timestamp: 'desc'
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

// New function to approve/reject pending auctions
// export const approveAuction = async (req, res) => {
//   try {
//     const { auctionId } = req.params;
//     const { approved } = req.body; // true to approve, false to reject

//     const auction = await prisma.auctionItem.findUnique({
//       where: { id: auctionId }
//     });

//     if (!auction) {
//       return res.status(404).json({ error: 'Auction not found' });
//     }

//     if (auction.status !== 'pending') {
//       return res.status(400).json({ 
//         error: 'Only pending auctions can be approved or rejected' 
//       });
//     }

//     if (approved) {
//       // Approve and activate
//       const updatedAuction = await prisma.auctionItem.update({
//         where: { id: auctionId },
//         data: { status: 'active' }
//       });

//       res.json({
//         message: 'Auction approved and activated',
//         auction: updatedAuction
//       });
//     } else {
//       // Reject and delete
//       await prisma.auctionItem.delete({
//         where: { id: auctionId }
//       });

//       res.json({ message: 'Auction rejected and deleted' });
//     }
//   } catch (error) {
//     console.error('Approve auction error:', error);
//     res.status(500).json({ error: 'Failed to process auction approval' });
//   }
// };

export const approveAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { approved } = req.body; // true to approve, false to reject

    const auction = await prisma.auctionItem.findUnique({
      where: { id: auctionId },
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

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    if (auction.status !== 'pending') {
      return res.status(400).json({ 
        error: 'Only pending auctions can be approved or rejected' 
      });
    }

    if (approved) {
      // Approve and activate
      const updatedAuction = await prisma.auctionItem.update({
        where: { id: auctionId },
        data: { status: 'active' },
        include: {
          seller: true,
          images: true
        }
      });

      res.json({
        message: 'Auction approved and activated',
        auction: updatedAuction
      });
    } else {
      // Reject and delete (or you could add a 'rejected' status instead)
      await prisma.auctionItem.delete({
        where: { id: auctionId }
      });

      res.json({ 
        message: 'Auction rejected and removed',
        auctionId 
      });
    }
  } catch (error) {
    console.error('Approve auction error:', error);
    res.status(500).json({ error: 'Failed to process auction approval' });
  }
};

// NEW: Update auction status (for reps to change active → closed, etc.)
export const updateAuctionStatus = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { status } = req.body; // 'active', 'closed', 'pending'

    if (!['active', 'closed', 'pending'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be: active, closed, or pending' 
      });
    }

    const auction = await prisma.auctionItem.findUnique({
      where: { id: auctionId }
    });

    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    const updatedAuction = await prisma.auctionItem.update({
      where: { id: auctionId },
      data: { status },
      include: {
        seller: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        images: true,
        _count: {
          select: { bids: true }
        }
      }
    });

    res.json({
      message: `Auction status updated to ${status}`,
      auction: updatedAuction
    });
  } catch (error) {
    console.error('Update auction status error:', error);
    res.status(500).json({ error: 'Failed to update auction status' });
  }
};