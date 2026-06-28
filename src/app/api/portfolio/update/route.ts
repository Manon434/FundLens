import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest
) {

  try {

    const body = await req.json();

    const portfolio =
      await prisma.portfolio.update({

        where: {
          id: body.id,
        },

        data: {
          name: body.name,
        },

      });

    return NextResponse.json(portfolio);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Update failed",
      },
      {
        status: 500,
      }
    );

  }

}