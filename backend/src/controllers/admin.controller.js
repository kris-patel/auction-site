/**
 * Admin Controller
 * Handles administrative operations for user and auction management
 */

import prisma from '../config/database.js';
import { hashPassword } from '../utils/bcrypt.js';

/**
 * Create a new customer representative
 * @access Admin only
 */
export const createRep = async (req, res) => {
  try {
    const { username, email, password, region } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email, and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user and representative profile in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: 'rep'
        }
      });

      await tx.representative.create({
        data: {
          userId: user.id,
          region: region || null,
          activeAuctions: 0,
          customersHandled: 0
        }
      });

      return user;
    });

    res.status(201).json({
      message: 'Customer representative created successfully',
      user: {
        id: result.id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt
      }
    });
  } catch (error) {
    console.error('Create rep error:', error);
    res.status(500).json({ error: 'Failed to create customer representative' });
  }
};

/**
 * Create a new admin account
 * @access Admin only
 */
export const createAdmin = async (req, res) => {
  try {
    const { username, email, password, adminLevel, permissions } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email, and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin user and profile in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: 'admin'
        }
      });

      await tx.admin.create({
        data: {
          userId: user.id,
          adminLevel: adminLevel || 1,
          permissions: permissions || 'basic',
          assignedReps: 0
        }
      });

      return user;
    });

    res.status(201).json({
      message: 'Admin created successfully',
      user: {
        id: result.id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
};

/**
 * Get all users with optional filtering by role and active status
 * @access Admin only
 */
export const getAllUsers = async (req, res) => {
  try {
    const { role, isActive } = req.query;

    // Build filter object
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
        _count: {
          select: {
            auctions: true,
            bids: true
          }
        },
        // Include role-specific data
        buyer: {
          select: {
            rating: true,
            purchaseCount: true,
            preferredCategory: true
          }
        },
        admin: {
          select: {
            adminLevel: true,
            assignedReps: true
          }
        },
        representative: {
          select: {
            region: true,
            activeAuctions: true,
            customersHandled: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Deactivate user account (soft delete)
 * @access Admin only
 */
export const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent self-deactivation
    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'You cannot deactivate yourself' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true
      }
    });

    res.json({
      message: 'User deactivated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Deactivate user error:', error);
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
};

/**
 * Reactivate previously deactivated user
 * @access Admin only
 */
export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive: true },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true
      }
    });

    res.json({
      message: 'User activated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Activate user error:', error);
    res.status(500).json({ error: 'Failed to activate user' });
  }
};

/**
 * Permanently delete user (hard delete with cascade)
 * @access Admin only
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent self-deletion
    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete yourself' });
    }

    await prisma.user.delete({
      where: { id }
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

/**
 * Get all auctions with optional status filtering
 * @access Admin only
 */
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
          orderBy: {
            displayOrder: 'asc'
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
    console.error('Get all auctions error:', error);
    res.status(500).json({ error: 'Failed to fetch auctions' });
  }
};