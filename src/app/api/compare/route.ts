import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzePortfolio } from "@/lib/analytics/analyzePortfolio";

async function buildAnalytics(portfolioId: string) {
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      id: portfolioId,
    },
    include: {
      holdings: {
        include: {
          fund: true,
        },
      },
    },
  });

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  const analyticsInput = await Promise.all(
    portfolio.holdings.map(async (holding) => {
      const fundHoldings = await prisma.fundHolding.findMany({
        where: {
          fundId: holding.fundId,
        },
      });

      const sectorWeights = new Map<string, number>();

      fundHoldings.forEach((stock) => {
        if (!stock.sector) return;

        sectorWeights.set(
          stock.sector,
          (sectorWeights.get(stock.sector) || 0) +
            stock.weight
        );
      });

      return {
        fundId: holding.fund.id,
        fundName: holding.fund.name,
        category: holding.fund.category ?? "Unknown",
        expenseRatio:
          holding.fund.expenseRatio ?? 0,
        aum: holding.fund.aum ?? 0,
        amountInvested:
          holding.amountInvested,
        monthlySip:
          holding.monthlySip ?? 0,

        sectors: Array.from(
          sectorWeights.entries()
        ).map(([name, weight]) => ({
          name,
          weight,
        })),
      };
    })
  );

  return {
    portfolio,
    analytics:
      analyzePortfolio(analyticsInput),
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const portfolioA =
      searchParams.get("portfolioA");

    const portfolioB =
      searchParams.get("portfolioB");

    if (!portfolioA || !portfolioB) {
      return NextResponse.json(
        {
          message:
            "Both portfolios are required.",
        },
        {
          status: 400,
        }
      );
    }

    const left =
      await buildAnalytics(portfolioA);

    const right =
      await buildAnalytics(portfolioB);

    let winner = "Tie";

    if (
      left.analytics.healthScore >
      right.analytics.healthScore
    ) {
      winner = left.portfolio.name;
    }

    if (
      right.analytics.healthScore >
      left.analytics.healthScore
    ) {
      winner = right.portfolio.name;
    }

    return NextResponse.json({
      left,
      right,
      winner,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }
}