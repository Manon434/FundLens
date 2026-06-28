"use client";

interface Suggestion {
  category: string;
  currentPercentage: number;
  recommendedPercentage: number;
  action: "Increase" | "Reduce" | "Maintain";
}

interface Props {
  suggestions: Suggestion[];
}

export default function RebalancingAdvisor({
  suggestions,
}: Props) {
  return (
    <div className="min-h-[430px] rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Rebalancing Advisor
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Smart Allocation
        </span>

      </div>

      <div className="space-y-5">

        {suggestions.map((item) => {

          const difference =
            item.currentPercentage -
            item.recommendedPercentage;

          return (

            <div
              key={item.category}
              className="rounded-xl border p-5 transition hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    {item.category}
                  </h3>

                  <p className="text-sm text-gray-500">

                    Current {item.currentPercentage}% •
                    Target {item.recommendedPercentage}%

                  </p>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.action === "Reduce"
                      ? "bg-red-100 text-red-700"
                      : item.action === "Increase"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.action}
                </span>

              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className={`h-full rounded-full ${
                    item.action === "Reduce"
                      ? "bg-red-500"
                      : item.action === "Increase"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      item.currentPercentage,
                      100
                    )}%`,
                  }}
                />

              </div>

              {item.action !== "Maintain" && (

                <p className="mt-4 text-sm text-gray-600">

                  {item.action === "Reduce"
                    ? `Reduce allocation by approximately ${difference.toFixed(
                        1
                      )}%`
                    : `Increase allocation by approximately ${Math.abs(
                        difference
                      ).toFixed(1)}%`}

                </p>

              )}

            </div>

          );

        })}

      </div>

    </div>
  );
}