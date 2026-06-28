import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzePortfolio } from "@/lib/analytics/analyzePortfolio";
import { calculateOverlap } from "@/lib/analytics/overlap";
import { generateRebalancingSuggestions } from "@/lib/analytics/rebalancing";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID required",
        },
        {
          status: 400,
        }
      );
    }

    const portfolio = await prisma.portfolio.findFirst({
      where: {
        userId,
      },
      include: {
        holdings: {
          include: {
            fund: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        {
          message: "Portfolio not found",
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------
    // Analytics Input
    // -----------------------------

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
            (sectorWeights.get(stock.sector) || 0) + stock.weight
          );
        });

        return {
          fundId: holding.fund.id,
          fundName: holding.fund.name,
          category: holding.fund.category ?? "Unknown",
          expenseRatio: holding.fund.expenseRatio ?? 0,
          aum: holding.fund.aum ?? 0,
          amountInvested: holding.amountInvested,
          monthlySip: holding.monthlySip ?? 0,

          sectors: Array.from(
            sectorWeights.entries()
          ).map(([name, weight]) => ({
            name,
            weight,
          })),
        };
      })
    );

    // -----------------------------
    // Portfolio Analytics
    // -----------------------------

    const analytics = analyzePortfolio(analyticsInput);
    const rebalancing =
    generateRebalancingSuggestions(
    analytics.categoryAllocation
     );

    // -----------------------------
    // Top Holdings
    // -----------------------------

    const topHoldings = await prisma.fundHolding.findMany({
  where: {
    fundId: {
      in: portfolio.holdings.map((h) => h.fundId),
    },
  },
  select: {
    id: true,
    stockName: true,
    sector: true,
    weight: true,
  },
  orderBy: {
    weight: "desc",
  },
  take: 10,
});
    // -----------------------------
    // Fund Overlap
    // -----------------------------

    const allFundHoldings = await prisma.fundHolding.findMany({
      where: {
        fundId: {
          in: portfolio.holdings.map(
            (holding) => holding.fundId
          ),
        },
      },
    });

    const overlaps = calculateOverlap(allFundHoldings);

    // -----------------------------
    // Response
    // -----------------------------

  return NextResponse.json({
  portfolio,
  analytics,
  topHoldings,
  overlaps,
  rebalancing,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}