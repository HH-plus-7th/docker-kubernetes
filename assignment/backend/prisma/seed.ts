import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  await prisma.user.upsert({
    where: { email: 'participant@example.com' },
    update: {
      name: 'Casey Participant',
      passwordHash
    },
    create: {
      email: 'participant@example.com',
      name: 'Casey Participant',
      passwordHash
    }
  });

  const products = [
    {
      name: 'Wool Throw Blanket',
      description: 'Soft merino blend for cool evenings.',
      priceCents: 8900,
      stock: 7
    },
    {
      name: 'Ceramic Pour-Over Set',
      description: 'Minimal brewer with matching dripper stand.',
      priceCents: 6200,
      stock: 14
    },
    {
      name: 'Analog Desk Clock',
      description: 'Quiet movement, matte brass frame, readable face.',
      priceCents: 4800,
      stock: 11
    },
    {
      name: 'Canvas Utility Tote',
      description: 'Structured everyday bag with reinforced straps.',
      priceCents: 5400,
      stock: 19
    },
    {
      name: 'Stoneware Mug Pair',
      description: 'Two matte glazed mugs sized for daily use.',
      priceCents: 3600,
      stock: 21
    },
    {
      name: 'Felt Desk Mat',
      description: 'Warm texture with enough room for laptop and notebook.',
      priceCents: 5100,
      stock: 13
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product
    });
  }
}

main()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
