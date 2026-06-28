import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const goal = await prisma.goal.create({
      data: {
        title: body.title,
        targetAmount: Number(body.targetAmount),
        timelineYears: Number(body.timelineYears),
        userId: body.userId,
      },
    });

    return NextResponse.json(goal);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create goal",
      },
      {
        status: 500,
      }
    );
  }
}