export interface StressScenario {
  id: string;

  name: string;

  description: string;

  severity: "Low" | "Medium" | "High";

  sectorChanges: Record<string, number>;
}

export interface PortfolioSector {
  name: string;

  investment: number;
}

export interface ImpactedSector {
  sector: string;

  investment: number;

  change: number;

  projectedValue: number;
}

export interface StressResult {
  currentValue: number;

  projectedValue: number;

  loss: number;

  lossPercentage: number;

  impactedSectors: ImpactedSector[];
}