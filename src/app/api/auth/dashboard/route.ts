// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { analyzePortfolio } from "@/lib/analytics/analyzePortfolio";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return NextResponse.json(
//         { message: "User ID required" },
//         { status: 400 }
//       );
//     }

//     // const portfolio = await prisma.portfolio.findFirst({
//     console.log("Dashboard User ID:", userId);

// const portfolios = await prisma.portfolio.findMany();

// console.log("All Portfolios:", portfolios);

// const portfolio = await prisma.portfolio.findFirst({
//       where: {
//         userId,
//       },
//       include: {
//         holdings: {
//           include: {
//             fund: true,
//           },
//         },
//       },
//     });
//   console.log("Matched Portfolio:", portfolio);

//     if (!portfolio) {
//       return NextResponse.json(
//         { message: "Portfolio not found" },
//         { status: 404 }
//       );
//     }

//     const analytics = analyzePortfolio(
//       portfolio.holdings.map((holding) => ({
//         fundId: holding.fund.id,
//         fundName: holding.fund.name,
//         category: holding.fund.category ?? "Unknown",
//         expenseRatio: holding.fund.expenseRatio ?? 0,
//         aum: holding.fund.aum ?? 0,
//         amountInvested: holding.amountInvested,
//         monthlySip: holding.monthlySip ?? 0,
//       }))
//     );

//     return NextResponse.json({
//       portfolio,
//       analytics,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzePortfolio } from "@/lib/analytics/analyzePortfolio";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    console.log("User ID:", userId);

    const allUsers = await prisma.user.findMany();
    console.log("Users:", allUsers);

    const allPortfolios = await prisma.portfolio.findMany();
    console.log("Portfolios:", allPortfolios);

    // const portfolio = await prisma.portfolio.findFirst({
    //   where: {
    //     userId: userId ?? "",
    //   },
    //   include: {
    //     holdings: {
    //       include: {
    //         fund: true,
    //       },
    //     },
    //   },
    // });
    const portfolio = await prisma.portfolio.findFirst({
  where: {
    userId: userId!,
  },
  include: {
    holdings: {
      include: {
        fund: true,
      },
    },
  },
});

console.log("Received userId:", userId);
console.log("Portfolio:", portfolio);

    console.log("Matched Portfolio:", portfolio);

    if (!portfolio) {
      return NextResponse.json(
        {
          debug: {
            userId,
            users: allUsers,
            portfolios: allPortfolios,
            matchedPortfolio: portfolio,
          },
        },
        {
          status: 404,
        }
      );
    }

   const analytics = analyzePortfolio(
  portfolio.holdings.map((holding) => ({
    fundId: holding.fund.id,
    fundName: holding.fund.name,
    category: holding.fund.category ?? "Unknown",
    expenseRatio: holding.fund.expenseRatio ?? 0,
    aum: holding.fund.aum ?? 0,
    amountInvested: holding.amountInvested,
    monthlySip: holding.monthlySip ?? 0,

    // Temporary for deployment
    sectors: [],
  }))
);

    return NextResponse.json({
      portfolio,
      analytics,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}