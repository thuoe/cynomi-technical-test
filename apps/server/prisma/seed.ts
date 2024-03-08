import { GENDER, PrismaClient } from '@prisma/client';
import { subDays } from 'date-fns';
const prisma = new PrismaClient();

const getRandomDuration = () => {
  return Math.floor(Math.random() * 8) + 1;
};

const getRandomDateInLastWeek = (): Date => {
  const today = new Date();
  const pastWeek = subDays(today, 7);
  return new Date(
    pastWeek.getTime() + Math.random() * (today.getTime() - pastWeek.getTime()),
  );
};

const generateSleepPattern = () =>
  Array.from({ length: 7 }).map(() => ({
    duration: getRandomDuration(),
    date: getRandomDateInLastWeek(),
  }));

async function generateRandomUser({
  name,
  gender,
}: {
  name: string;
  gender: GENDER;
}) {
  return await prisma.user.upsert({
    where: { name },
    update: {},
    create: {
      name,
      gender,
      sleepPatterns: {
        createMany: {
          data: generateSleepPattern(),
        },
      },
    },
  });
}

async function main() {
  const eddie = await generateRandomUser({ name: 'Eddie', gender: 'male' });
  const sam = await generateRandomUser({ name: 'Sam', gender: 'male' });
  const judy = await generateRandomUser({ name: 'Judy', gender: 'female' });
  console.log({ eddie, sam, judy });
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
