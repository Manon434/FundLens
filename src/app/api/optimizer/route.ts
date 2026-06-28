import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { scenarios } from "@/lib/optimizer/scenarios";

import { simulateStress } from "@/lib/optimizer/stressEngine";

import { analyzePortfolio } from "@/lib/analytics/analyzePortfolio";

import { generateReplacementSuggestions } from "@/lib/optimizer/replacementEngine";

export async function GET(req: NextRequest) {
  try {

    const { searchParams } = new URL(req.url);

    const portfolioId = searchParams.get("portfolioId");

    const scenarioName = searchParams.get("scenario");

    if (!portfolioId || !scenarioName) {

      return NextResponse.json(
        {
          message: "Missing parameters",
        },
        {
          status: 400,
        }
      );

    }

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

      return NextResponse.json(
        {
          message: "Portfolio not found",
        },
        {
          status: 404,
        }
      );

    }

    const analyticsInput = await Promise.all(

      portfolio.holdings.map(async (holding) => {

        const fundHoldings =
          await prisma.fundHolding.findMany({
            where: {
              fundId: holding.fundId,
            },
          });

        const sectorMap = new Map<
          string,
          number
        >();

        fundHoldings.forEach((stock) => {

          if (!stock.sector) return;

          sectorMap.set(
            stock.sector,
            (sectorMap.get(stock.sector) || 0) +
              stock.weight
          );

        });

        return {

          fundId: holding.fund.id,

          fundName: holding.fund.name,

          category:
            holding.fund.category ??
            "Unknown",

          expenseRatio:
            holding.fund.expenseRatio ?? 0,

          aum:
            holding.fund.aum ?? 0,

          amountInvested:
            holding.amountInvested,

          monthlySip:
            holding.monthlySip ?? 0,

          sectors: Array.from(
            sectorMap.entries()
          ).map(([name, weight]) => ({
            name,
            weight,
          })),

        };

      })

    );

    const analytics =
      analyzePortfolio(analyticsInput);

    const sectors = Object.entries(
      analytics.sectorAllocation
    ).map(([name, investment]) => ({
      name,
      investment,
    }));

    const scenario = scenarios.find(
      (item) => item.name === scenarioName
    );

    const replacementSuggestions =
  await generateReplacementSuggestions(

  analyticsInput.map((item) => ({
  fundId: item.fundId,
  fundName: item.fundName,
  category: item.category,
  expenseRatio: item.expenseRatio,
  aum: item.aum,
  amountInvested: item.amountInvested,
}))

  );

    if (!scenario) {

      return NextResponse.json(
        {
          message: "Scenario not found",
        },
        {
          status: 404,
        }
      );

    }

    const stress =
      simulateStress(
        analytics.totalInvestment,
        sectors,
        scenario
      );

    const weakest = stress.impactedSectors
      .filter((s) => s.change < 0)
      .slice(0, 5);

    

    return NextResponse.json({

      portfolio: {
        id: portfolio.id,
        name: portfolio.name,
      },

      analytics,

      scenario,

      stress,

      weakest,

      replacementSuggestions,

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