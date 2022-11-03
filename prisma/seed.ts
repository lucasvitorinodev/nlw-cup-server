import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John",
      email: "john@example.com",
      avatarUrl: "https://github.com/lucasvitorinodev.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        }
      }
    },
  });

  await prisma.game.create({
    data: {
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
      date: '2022-11-02T12:00:00.201Z'
    }
  })

  await prisma.game.create({
    data: {
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'BR',
      date: '2022-11-02T12:00:00.201Z',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })


}

main();
