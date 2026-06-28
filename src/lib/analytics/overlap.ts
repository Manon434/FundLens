export interface StockOverlap {
  stockName: string;
  sector: string;
  occurrences: number;
  totalWeight: number;
}

interface FundHolding {
  stockName: string;
  sector: string | null;
  weight: number;
}

export function calculateOverlap(
  holdings: FundHolding[]
): StockOverlap[] {

  const map = new Map<string, StockOverlap>();

  holdings.forEach((holding) => {

    const existing = map.get(holding.stockName);

    if (existing) {

      existing.occurrences += 1;

      existing.totalWeight += holding.weight;

    } else {

      map.set(holding.stockName, {

        stockName: holding.stockName,

        sector: holding.sector ?? "Unknown",

        occurrences: 1,

        totalWeight: holding.weight,

      });

    }

  });

  return [...map.values()]
    .filter((stock) => stock.occurrences > 1)
    .sort((a, b) => b.totalWeight - a.totalWeight);

}