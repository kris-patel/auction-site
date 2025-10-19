import { PrismaClient } from '@prisma/client';
import { hashPassword } from './utils/bcrypt';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});


const user = await prisma.user.create({
  data: {
    email: "test1@example.com",
    username: "Dummy User",
    password: x,
    role: "buyer"
  },
});
console.log("Inserted:", user);
