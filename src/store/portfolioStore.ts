import { create } from "zustand";

export interface SelectedFund {
  fundId: string;
  fundName: string;
  category: string;
  expenseRatio: number;
  aum: number;
  amountInvested: number;
  monthlySip: number;
}

interface PortfolioStore {
  portfolioName: string;

  funds: SelectedFund[];

  setPortfolioName: (name: string) => void;

  addFund: (fund: SelectedFund) => void;

  removeFund: (fundId: string) => void;

  clearPortfolio: () => void;

  totalInvestment: () => number;

  totalSip: () => number;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({

  portfolioName: "",

  funds: [],

  setPortfolioName: (name) =>
    set({
      portfolioName: name,
    }),

  addFund: (fund) =>
    set((state) => {

      const alreadyExists = state.funds.some(
        (f) => f.fundId === fund.fundId
      );

      if (alreadyExists) return state;

      return {
        funds: [...state.funds, fund],
      };
    }),

  removeFund: (fundId) =>
    set((state) => ({
      funds: state.funds.filter(
        (f) => f.fundId !== fundId
      ),
    })),

  clearPortfolio: () =>
    set({
      portfolioName: "",
      funds: [],
    }),

  totalInvestment: () =>
    get().funds.reduce(
      (sum, fund) => sum + fund.amountInvested,
      0
    ),

  totalSip: () =>
    get().funds.reduce(
      (sum, fund) => sum + fund.monthlySip,
      0
    ),

}));