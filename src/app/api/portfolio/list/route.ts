import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const portfolios = await prisma.portfolio.findMany({

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

    return NextResponse.json(portfolios);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch portfolios",
      },
      {
        status: 500,
      }
    );

  }

}