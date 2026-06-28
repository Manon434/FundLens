import { prisma } from "@/lib/prisma";

interface PortfolioFund {
  fundId: string;
  fundName: string;
  category: string;
  expenseRatio: number;
  aum: number;
  amountInvested: number;
}

interface ReplacementSuggestion {
  currentFund: string;
  replacement: string;
  currentExpense: number;
  replacementExpense: number;
  currentAUM: number;
  replacementAUM: number;
  expectedImprovement: number;
  reason: string;
}

export async function generateReplacementSuggestions(
  portfolioFunds: PortfolioFund[]
): Promise<ReplacementSuggestion[]> {

  const suggestions: ReplacementSuggestion[] = [];

  for (const current of portfolioFunds) {

    const alternatives = await prisma.fund.findMany({

      where: {

        category: current.category,

        NOT: {
          id: current.fundId,
        },

      },

      include: {
        holdings: true,
      },

    });

    if (alternatives.length === 0)
      continue;

    let bestFund = null;

    let bestScore = -999999;

    for (const fund of alternatives) {

      let score = 0;

      //-----------------------------------
      // Lower Expense Ratio
      //-----------------------------------

      score +=
        (current.expenseRatio -
          (fund.expenseRatio ?? 0)) *
        120;

      //-----------------------------------
      // Higher AUM
      //-----------------------------------

      score +=
        (fund.aum ?? 0) / 8000;

      //-----------------------------------
      // Diversification
      //-----------------------------------

      score +=
        fund.holdings.length * 0.45;

      //-----------------------------------
      // Small bonus for established funds
      //-----------------------------------

      if ((fund.aum ?? 0) > current.aum)
        score += 5;

      if (score > bestScore) {

        bestScore = score;

        bestFund = fund;

      }

    }

    if (!bestFund)
      continue;

    let reason = "";

    if (
      (bestFund.expenseRatio ?? 0) <
      current.expenseRatio
    ) {

      reason =
        "Lower expense ratio";

    } else if (
      (bestFund.aum ?? 0) >
      current.aum
    ) {

      reason =
        "Higher Assets Under Management";

    } else {

      reason =
        "Better diversification";

    }

    suggestions.push({

      currentFund: current.fundName,

      replacement: bestFund.name,

      currentExpense:
        current.expenseRatio,

      replacementExpense:
        bestFund.expenseRatio ?? 0,

      currentAUM:
        current.aum,

      replacementAUM:
        bestFund.aum ?? 0,

      expectedImprovement:
        Math.round(bestScore),

      reason,

    });

  }

  suggestions.sort(
    (a, b) =>
      b.expectedImprovement -
      a.expectedImprovement
  );

  return suggestions;
}