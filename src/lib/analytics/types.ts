export interface HoldingAnalysis {
  fundId: string;
  fundName: string;
  category: string;
  expenseRatio: number;
  aum: number;
  amountInvested: number;
  monthlySip: number;

  sectors: {
    name: string;
    weight: number;
  }[];
}

export interface PortfolioAnalytics {
  totalInvestment: number;
  totalSip: number;

  averageExpenseRatio: number;

  diversificationScore: number;

  healthScore: number;

  grade: string;

  risk: "Low" | "Moderate" | "High";

  categoryAllocation: Record<string, number>;

  sectorAllocation: Record<string, number>;

  overlapPercentage: number;

  recommendations: string[];
}