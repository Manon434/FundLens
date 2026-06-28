import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {

    const { id } = await params;

    const fund = await prisma.fund.findUnique({

      where: {
        id,
      },

      include: {
        holdings: {
          orderBy: {
            weight: "desc",
          },
          take: 15,
        },
      },

    });

    if (!fund) {

      return NextResponse.json(
        {
          message: "Fund not found",
        },
        {
          status: 404,
        }
      );

    }

    const sectorAllocation: Record<
      string,
      number
    > = {};

    fund.holdings.forEach((holding) => {

      if (!holding.sector) return;

      sectorAllocation[
        holding.sector
      ] =
        (sectorAllocation[
          holding.sector
        ] || 0) + holding.weight;

    });

    const similarFunds =
      await prisma.fund.findMany({

        where: {

          category: fund.category,

          NOT: {
            id: fund.id,
          },

        },

        take: 5,

      });

    return NextResponse.json({

      fund,

      sectorAllocation,

      similarFunds,

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