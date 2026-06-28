import { PrismaClient } from "@prisma/client";
import stocks from "../src/data/stocks.json";

const prisma = new PrismaClient();

function getRandomStocks(count: number) {
  const shuffled = [...stocks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  console.log(" Seeding Fund Holdings...");

  const funds = await prisma.fund.findMany();

  await prisma.fundHolding.deleteMany();

  const commonStocks = [
    "HDFC Bank",
    "Reliance Industries",
    "Infosys"
  ];

  for (const fund of funds) {
    let selectedStocks = getRandomStocks(7);

    for (const common of commonStocks) {
      const stock = stocks.find(
        (s) => s.name === common
      );

      if (stock) {
        selectedStocks.push(stock);
      }
    }

    let remainingWeight = 100;

    for (let i = 0; i < selectedStocks.length; i++) {
      const stock = selectedStocks[i];

      let weight;

      if (i === selectedStocks.length - 1) {
        weight = Number(
          remainingWeight.toFixed(2)
        );
      } else {
        weight = Number(
          (
            Math.random() * 8 +
            4
          ).toFixed(2)
        );

        remainingWeight -= weight;
      }

      await prisma.fundHolding.create({
        data: {
          stockName: stock.name,
          sector: stock.sector,
          weight,
          fundId: fund.id,
        },
      });
    }
  }

  console.log(" Holdings Seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });