import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const funds = await prisma.fund.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(funds);
}