import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const portfolio = await prisma.portfolio.create({
      data: {
        name: body.name,
        userId: body.userId,

        holdings: {
         create: body.holdings.map((holding: any) => ({
        fundId: holding.fundId,
        amountInvested: Number(holding.amountInvested),
         monthlySip: Number(holding.monthlySip ?? 0),
          })),
        },
      },

      include: {
        holdings: true,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}