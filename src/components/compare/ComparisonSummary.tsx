"use client";

interface Props {
  left: any;
  right: any;
}

export default function ComparisonSummary({
  left,
  right,
}: Props) {

  const rows = [
    {
      label: "Health Score",
      left: left.analytics.healthScore,
      right: right.analytics.healthScore,
    },
    {
      label: "Grade",
      left: left.analytics.grade,
      right: right.analytics.grade,
    },
    {
      label: "Risk",
      left: left.analytics.risk,
      right: right.analytics.risk,
    },
    {
      label: "Expense Ratio",
      left:
        left.analytics.averageExpenseRatio.toFixed(
          2
        ) + "%",
      right:
        right.analytics.averageExpenseRatio.toFixed(
          2
        ) + "%",
    },
    {
      label: "Investment",
      left:
        "₹" +
        left.analytics.totalInvestment.toLocaleString(
          "en-IN"
        ),
      right:
        "₹" +
        right.analytics.totalInvestment.toLocaleString(
          "en-IN"
        ),
    },
    {
      label: "Monthly SIP",
      left:
        "₹" +
        left.analytics.totalSip.toLocaleString(
          "en-IN"
        ),
      right:
        "₹" +
        right.analytics.totalSip.toLocaleString(
          "en-IN"
        ),
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Portfolio Comparison
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-4 text-left">
              Metric
            </th>

            <th className="py-4 text-center">
              {left.portfolio.name}
            </th>

            <th className="py-4 text-center">
              {right.portfolio.name}
            </th>

          </tr>

        </thead>

        <tbody>

          {rows.map((row) => (

            <tr
              key={row.label}
              className="border-b"
            >

              <td className="py-4 font-semibold">
                {row.label}
              </td>

              <td className="py-4 text-center">
                {row.left}
              </td>

              <td className="py-4 text-center">
                {row.right}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}