"use client";

interface Props {
  healthScore: number;
  diversificationScore: number;
  averageExpenseRatio: number;
  overlapPercentage: number;
  risk: string;
}

export default function PortfolioXRay({
  healthScore,
  diversificationScore,
  averageExpenseRatio,
  overlapPercentage,
  risk,
}: Props) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  if (diversificationScore >= 80)
    strengths.push("Well diversified portfolio");
  else {
    weaknesses.push("Low diversification");
    recommendations.push("Add more diversified mutual funds.");
  }

  if (averageExpenseRatio <= 1)
    strengths.push("Low expense ratio");
  else {
    weaknesses.push("High expense ratio");
    recommendations.push("Consider lower-cost index funds.");
  }

  if (overlapPercentage > 20) {
    weaknesses.push("High portfolio overlap");
    recommendations.push("Reduce overlapping funds.");
  } else {
    strengths.push("Low fund overlap");
  }

  if (risk === "High") {
    weaknesses.push("Aggressive risk profile");
    recommendations.push("Increase Large Cap allocation.");
  } else {
    strengths.push(`${risk} risk profile`);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Portfolio X-Ray
      </h2>

      <div className="mb-6 rounded-xl bg-blue-50 p-5">

        <p className="text-sm text-gray-500">
          Overall Health Score
        </p>

        <h1 className="mt-2 text-5xl font-bold text-blue-600">
          {healthScore}/100
        </h1>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <h3 className="mb-3 font-semibold text-green-600">
            Strengths
          </h3>

          <ul className="space-y-2 text-sm">

            {strengths.map((item) => (
              <li key={item}>
                ✅ {item}
              </li>
            ))}

          </ul>

        </div>

        <div>

          <h3 className="mb-3 font-semibold text-red-600">
            Weaknesses
          </h3>

          <ul className="space-y-2 text-sm">

            {weaknesses.map((item) => (
              <li key={item}>
                ⚠ {item}
              </li>
            ))}

          </ul>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-3 font-semibold">
          Recommendations
        </h3>

        <ul className="space-y-2">

          {recommendations.map((item) => (
            <li
              key={item}
              className="rounded-lg bg-emerald-50 p-3"
            >
              {item}
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}