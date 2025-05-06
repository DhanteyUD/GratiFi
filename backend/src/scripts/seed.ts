import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.creator.create({
    data: {
      name: 'DhanteyUD',
      address: 'DjpEEqezCcUhJ891idmqWdbbyQWevRkyZvDKf34sBFTq',
    },
  });
  console.log('Creator added');
}

main().finally(() => prisma.$disconnect());
