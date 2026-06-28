import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest
) {

  try {

    const body = await req.json();

    await prisma.holding.deleteMany({
      where: {
        portfolioId: body.id,
      },
    });

    await prisma.portfolio.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Delete failed",
      },
      {
        status: 500,
      }
    );

  }

}