import { PrismaClient } from '@gen/client/restaurants';
import { PrismaClient as PrismaUserClient, Role } from '@gen/client/users';

const prisma = new PrismaClient();
const prismaUser = new PrismaUserClient();
async function main() {
  const user = await prismaUser.user.findFirst({
    where: {
      roles: {
        has: Role.RESTAURATEUR,
      },
    },
  });

  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'Le parrain',
      address: '1 rue du parrain',
      phone: '+33123456789',
      owner: user.id,
      priceRange: 'MEDIUM',
      siret: '123456789',
      category: 'ITALIAN,PIZZA',
    },
  });

  await prisma.item.createMany({
    data: [
      {
        name: 'Pizza',
        description: 'Pizza 4 fromages',
        price: 12,
        restaurantId: restaurant.id,
      },
      {
        name: 'Pasta',
        description: 'Pasta bolognese',
        price: 10,
        restaurantId: restaurant.id,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
