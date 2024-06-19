import { PrismaClient } from '@gen/client/restaurants';
import { PrismaClient as PrismaUserClient, Role } from '@gen/client/users';

const data = [
  {
    name: 'Pizza',
    description: 'Pizza 4 fromages',
    price: 12,
  },
  {
    name: 'Pasta',
    description: 'Pasta bolognese',
    price: 10,
  },
  {
    name: 'Salad',
    description: 'Salad with tomato and mozzarella',
    price: 8,
  },
  {
    name: 'Tiramisu',
    description: 'Tiramisu with coffee',
    price: 5,
  },
];

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
      priceRange: '10-20€',
      siret: '123456789',
      category: 'ITALIAN,PIZZA',
    },
  });

  await prisma.item.createMany({
    data: data.map((item) => ({ ...item, restaurantId: restaurant.id })),
  });

  const getItems = await prisma.item.findMany({
    where: {
      restaurantId: restaurant.id,
    },
  });

  await prisma.menu.create({
    data: {
      name: 'Menu 1',
      price: 20,
      restaurantId: restaurant.id,
      items: {
        connect: getItems.map((item) => ({ id: item.id })),
      },
    },
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
