"use client";

interface Props {
  risk: string;
  overlapPercentage: number;
  averageExpenseRatio: number;
  diversificationScore: number;
}

export default function RebalancingAdvisor({
  risk,
  overlapPercentage,
  averageExpenseRatio,
  diversificationScore,
}: Props) {
  const suggestions: string[] = [];

  if (diversificationScore < 70) {
    suggestions.push(
      "Increase diversification by adding funds from different categories."
    );
  }

  if (averageExpenseRatio > 1) {
    suggestions.push(
      "Replace one high expense ratio fund with a low-cost index fund."
    );
  }

  if (overlapPercentage > 20) {
    suggestions.push(
      "Portfolio overlap is high. Replace one overlapping fund."
    );
  }

  if (risk === "High") {
    suggestions.push(
      "Reduce small-cap exposure to lower portfolio risk."
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Your portfolio is well balanced. No major rebalancing needed."
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Rebalancing Advisor
      </h2>

      <div className="space-y-4">

        {suggestions.map((item) => (
          <div
            key={item}
            className="rounded-xl border-l-4 border-blue-500 bg-blue-50 p-4"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}