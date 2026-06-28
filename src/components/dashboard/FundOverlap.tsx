"use client";

interface Overlap {
  stockName: string;
  sector: string;
  occurrences: number;
  totalWeight: number;
}

interface Props {
  overlaps: Overlap[];
}

export default function FundOverlap({
  overlaps,
}: Props) {

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Fund Overlap
        </h2>

        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
          Risk Analysis
        </span>

      </div>

      {overlaps.length === 0 ? (

        <div className="rounded-xl bg-green-50 p-5 text-center">

          <p className="text-lg">
            🎉 No significant overlap detected.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Your funds are well diversified.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {overlaps.map((stock) => (

            <div
              key={stock.stockName}
              className="rounded-xl border p-4 transition hover:shadow-md"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="font-semibold">
                    {stock.stockName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {stock.sector}
                  </p>

                </div>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  {stock.occurrences} Funds
                </span>

              </div>

              <div className="mt-4">

                <div className="mb-2 flex justify-between text-sm">

                  <span>
                    Combined Weight
                  </span>

                  <span className="font-semibold">
                    {stock.totalWeight.toFixed(2)}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: `${Math.min(stock.totalWeight, 100)}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}