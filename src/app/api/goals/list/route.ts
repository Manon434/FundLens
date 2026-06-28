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

    const goals = await prisma.goal.findMany({

      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

    });

    return NextResponse.json(goals);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load goals",
      },
      {
        status: 500,
      }
    );

  }

}