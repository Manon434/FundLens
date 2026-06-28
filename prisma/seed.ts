import { PrismaClient } from "@prisma/client";
import funds from "../src/data/funds.json";

const prisma = new PrismaClient();

async function main() {
  console.log(" Starting seed...");

  await prisma.fund.deleteMany();

  for (const fund of funds) {
    await prisma.fund.create({
      data: {
        name: fund.name,
        category: fund.category,
        expenseRatio: fund.expenseRatio,
        aum: fund.aum,
      },
    });
  }

  console.log(`Seeded ${funds.length} funds`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });