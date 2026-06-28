export interface HoldingInput {
  fundId: string;
  amountInvested: number;
  monthlySip?: number;
}

export interface CreatePortfolioInput {
  name: string;
  userId: string;
  holdings: HoldingInput[];
}