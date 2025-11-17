// import prisma from '../config/database.js';
// import { hashPassword, comparePassword } from '../utils/bcrypt.js';
// import { generateToken } from '../utils/jwt.js';

// export const register = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;

//     // Validate input
//     if (!username || !email || !password || !role) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Only allow buyer and seller to self-register
//     if (!['buyer', 'seller'].includes(role)) {
//       return res.status(400).json({ 
//         error: 'Only buyers and sellers can self-register' 
//       });
//     }

//     // Check if user already exists
//     const existingUser = await prisma.user.findFirst({
//       where: {
//         OR: [{ email }, { username }]
//       }
//     });

//     if (existingUser) {
//       return res.status(400).json({ 
//         error: 'User with this email or username already exists' 
//       });
//     }

//     // Hash password
//     const hashedPassword = await hashPassword(password);


//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//         role
//       },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         createdAt: true
//       }
//     });

//     // Generate token
//     const token = generateToken({ 
//       id: user.id, 
//       email: user.email, 
//       role: user.role 
//     });

//     // console.log(token);

//     res.status(201).json({
//       message: 'User registered successfully',
//       token,
//       user
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find user
//     const user = await prisma.user.findUnique({
//       where: { email }
//     });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Check if user is active
//     if (!user.isActive) {
//       return res.status(403).json({ error: 'Account is deactivated' });
//     }

//     // Verify password
//     const isPasswordValid = await comparePassword(password, user.password);
    

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

    
//     // Generate token
//     const token = generateToken({ 
//       id: user.id, 
//       email: user.email, 
//       role: user.role 
//     });

//     // console.log(token)

//     res.json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Login failed' });
//   }
// };

// export const getProfile = async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: req.user.id },
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         createdAt: true,
//         isActive: true
//       }
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({ user });
//   } catch (error) {
//     console.error('Get profile error:', error);
//     res.status(500).json({ error: 'Failed to fetch profile' });
//   }
// };

import prisma from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate input
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Only allow buyer and seller to self-register
    if (!['buyer', 'seller'].includes(role)) {
      return res.status(400).json({ 
        error: 'Only buyers and sellers can self-register' 
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

    // Create user with role-specific profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create base user
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role
        }
      });

      // Create role-specific profile
      if (role === 'buyer') {
        await tx.buyer.create({
          data: {
            userId: user.id,
            rating: 0,
            purchaseCount: 0
          }
        });
      }
      // Note: Sellers don't have a separate profile table in the schema
      // They use the User table directly with auctions relation

      return user;
    });

    // Generate token
    const token = generateToken({ 
      id: result.id, 
      email: result.email, 
      role: result.role 
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {

    console.log(req.body);
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }


    // Generate token
    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profileImage: true,
        createdAt: true,
        isActive: true,
        // Include role-specific data
        buyer: true,
        admin: true,
        representative: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};