import {
  HoldingAnalysis,
  PortfolioAnalytics,
} from "./types";

export function analyzePortfolio(
  holdings: HoldingAnalysis[]
): PortfolioAnalytics {

  const totalInvestment = holdings.reduce(
    (sum, fund) => sum + fund.amountInvested,
    0
  );

  const totalSip = holdings.reduce(
    (sum, fund) => sum + fund.monthlySip,
    0
  );

  const averageExpenseRatio =
    holdings.length === 0
      ? 0
      : holdings.reduce(
          (sum, fund) => sum + fund.expenseRatio,
          0
        ) / holdings.length;

  const categoryAllocation: Record<string, number> = {};
  const sectorAllocation: Record<string, number> = {};

  holdings.forEach((fund) => {

    categoryAllocation[fund.category] =
      (categoryAllocation[fund.category] || 0) +
      fund.amountInvested;

    fund.sectors.forEach((sector) => {

      sectorAllocation[sector.name] =
        (sectorAllocation[sector.name] || 0) +
        (fund.amountInvested * sector.weight) / 100;

    });

  });

  // ---------------------------------
  // Diversification
  // ---------------------------------

  let diversificationScore = 40;

  if (holdings.length >= 4)
    diversificationScore = 70;

  if (holdings.length >= 6)
    diversificationScore = 90;

  // ---------------------------------
  // Expense Score
  // ---------------------------------

  let expenseScore = 25;

  if (averageExpenseRatio > 1)
    expenseScore = 18;

  if (averageExpenseRatio > 1.5)
    expenseScore = 10;

  // ---------------------------------
  // Sector Balance
  // ---------------------------------

  const sectorCount = Object.keys(
    sectorAllocation
  ).length;

  let sectorScore = 20;

  if (sectorCount <= 5)
    sectorScore = 10;

  // ---------------------------------
  // Risk
  // ---------------------------------

  let risk: "Low" | "Moderate" | "High" =
    "Moderate";

  const categories = Object.keys(
    categoryAllocation
  );

  let riskScore = 15;

  if (
    categories.some((category) =>
      category.toLowerCase().includes("small")
    )
  ) {

    risk = "High";
    riskScore = 8;

  }

  if (
    categories.length > 0 &&
    categories.every((category) =>
      category.toLowerCase().includes("large")
    )
  ) {

    risk = "Low";
    riskScore = 15;

  }

  // ---------------------------------
  // Overlap
  // ---------------------------------

  const overlapPercentage = Math.min(
    holdings.length * 8,
    100
  );

  let overlapScore = 15;

  if (overlapPercentage > 20)
    overlapScore = 8;

  // ---------------------------------
  // Final Health Score
  // ---------------------------------

  const healthScore = Math.round(

    diversificationScore * 0.40 +

    expenseScore * 0.20 +

    sectorScore * 0.15 +

    riskScore * 0.15 +

    overlapScore * 0.10

  );

  // ---------------------------------
  // Portfolio Grade
  // ---------------------------------

  let grade = "D";

  if (healthScore >= 90)
    grade = "A+";

  else if (healthScore >= 80)
    grade = "A";

  else if (healthScore >= 70)
    grade = "B";

  else if (healthScore >= 60)
    grade = "C";

  // ---------------------------------
  // Smart Recommendation Engine
  // ---------------------------------

  const recommendations: string[] = [];

  if (diversificationScore < 70) {

    recommendations.push(
      `HIGH • Diversification score is ${diversificationScore}. Add funds from different categories to improve portfolio balance.`
    );

  }

  if (averageExpenseRatio > 1) {

    recommendations.push(
      `MEDIUM • Average expense ratio is ${averageExpenseRatio.toFixed(
        2
      )}%. Consider replacing expensive active funds with low-cost index funds.`
    );

  }

  if (overlapPercentage > 20) {

    recommendations.push(
      `HIGH • Portfolio overlap is ${overlapPercentage.toFixed(
        0
      )}%. Multiple funds own similar stocks, reducing diversification.`
    );

  }

  if (risk === "High") {

    recommendations.push(
      "MEDIUM • Small-cap allocation is high. Increasing Large Cap or Flexi Cap exposure can reduce volatility."
    );

  }

  if (Object.keys(categoryAllocation).length < 4) {

    recommendations.push(
      "LOW • Your portfolio is concentrated in a few categories. Consider adding another fund category."
    );

  }

  if (recommendations.length === 0) {

    recommendations.push(
      "Portfolio is well balanced. No major improvements are currently recommended."
    );

  }

  return {

    totalInvestment,

    totalSip,

    averageExpenseRatio,

    diversificationScore,

    healthScore,

    grade,

    risk,

    categoryAllocation,

    sectorAllocation,

    overlapPercentage,

    recommendations,

  };

}