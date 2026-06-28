import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        portfolios: {
          include: {
            holdings: true,
          },
        },
        goals: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const totalInvestment =
      user.portfolios.reduce(
        (portfolioSum, portfolio) =>
          portfolioSum +
          portfolio.holdings.reduce(
            (holdingSum, holding) =>
              holdingSum +
              holding.amountInvested,
            0
          ),
        0
      );

    return NextResponse.json({
      name: user.name,
      email: user.email,
      portfolios: user.portfolios.length,
      goals: user.goals.length,
      totalInvestment,
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