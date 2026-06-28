export interface RebalanceSuggestion {
  category: string;
  currentPercentage: number;
  recommendedPercentage: number;
  action: "Increase" | "Reduce" | "Maintain";
}

export function generateRebalancingSuggestions(
  allocation: Record<string, number>
): RebalanceSuggestion[] {

  const totalInvestment = Object.values(allocation).reduce(
    (sum, value) => sum + value,
    0
  );

  const suggestions: RebalanceSuggestion[] = [];

  const targets: Record<string, number> = {
    "Large Cap": 50,
    "Flexi Cap": 20,
    "Mid Cap": 15,
    "Small Cap": 10,
    "Debt": 5,
  };

  Object.entries(allocation).forEach(([category, amount]) => {

    const currentPercentage =
      (amount / totalInvestment) * 100;

    const recommendedPercentage =
      targets[category] ?? currentPercentage;

    let action: "Increase" | "Reduce" | "Maintain" =
      "Maintain";

    if (currentPercentage > recommendedPercentage + 5)
      action = "Reduce";

    else if (
      currentPercentage <
      recommendedPercentage - 5
    )
      action = "Increase";

    suggestions.push({
      category,
      currentPercentage: Number(
        currentPercentage.toFixed(1)
      ),
      recommendedPercentage,
      action,
    });

  });

  return suggestions.sort((a, b) => {

    const priority = {
      Reduce: 0,
      Increase: 1,
      Maintain: 2,
    };

    return priority[a.action] - priority[b.action];

  });

}