import {
  PortfolioSector,
  StressResult,
  StressScenario,
  ImpactedSector,
} from "./optimizerTypes";

export function simulateStress(
  totalInvestment: number,
  sectors: PortfolioSector[],
  scenario: StressScenario
): StressResult {

  let projectedValue = totalInvestment;

  const impactedSectors: ImpactedSector[] = [];

  for (const sector of sectors) {

    const percentageChange =
      scenario.sectorChanges[sector.name] ?? 0;

    const sectorImpact =
      (sector.investment * percentageChange) / 100;

    const projectedSectorValue =
      sector.investment + sectorImpact;

    projectedValue += sectorImpact;

    impactedSectors.push({
      sector: sector.name,
      investment: sector.investment,
      change: percentageChange,
      projectedValue: Math.max(
        0,
        projectedSectorValue
      ),
    });

  }

  const loss =
    totalInvestment - projectedValue;

  const lossPercentage =
    totalInvestment === 0
      ? 0
      : (loss / totalInvestment) * 100;

  impactedSectors.sort(
    (a, b) => a.change - b.change
  );

  return {

    currentValue: totalInvestment,

    projectedValue: Math.max(
      0,
      projectedValue
    ),

    loss: Math.max(0, loss),

    lossPercentage,

    impactedSectors,

  };

}