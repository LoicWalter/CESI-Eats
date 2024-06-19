import { PrismaClient, Role } from '@gen/client/users';
import * as bcrypt from 'bcrypt';

const users = [
  {
    email: 'alice@example.com',
    phoneNumber: '+33123456789',
    name: 'Alice',
    password: 'alice',
    roles: [Role.CLIENT],
  },
  {
    email: 'bob@example.com',
    phoneNumber: '+33987654321',
    name: 'Bob',
    password: 'bob',
    roles: [Role.RESTAURATEUR],
  },
  {
    email: 'charlie@example.com',
    phoneNumber: '+33654987123',
    name: 'Charlie',
    password: 'charlie',
    roles: [Role.LIVREUR],
  },
];

const prisma = new PrismaClient();
async function main() {
  await prisma.user.deleteMany({
    where: {
      email: 'admin@admin.com',
    },
  });
  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      phoneNumber: '+33111111111',
      name: 'admin',
      password: await bcrypt.hash('admin', 10),
      roles: [Role.ADMIN],
      // apiKey: 'admin',
    },
  });

  const newUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    })),
  });

  const withParrain = await prisma.user.createMany({
    data: [
      {
        name: 'David',
        email: 'david@example.com',
        phoneNumber: '+33695873214',
        password: await bcrypt.hash('david', 10),
        parrainId: newUsers[0].id,
        roles: [Role.CLIENT],
      },
      {
        name: 'Eve',
        email: 'eve@example.com',
        phoneNumber: '+33256987431',
        password: await bcrypt.hash('eve', 10),
        parrainId: newUsers[0].id,
        roles: [Role.CLIENT],
      },
    ],
  });

  console.log({ admin, newUsers, withParrain });
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
