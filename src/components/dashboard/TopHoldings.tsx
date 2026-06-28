"use client";

interface Holding {
  id?: string;
  stockName: string;
  sector: string | null;
  weight: number;
}

interface Props {
  holdings: Holding[];
}

export default function TopHoldings({
  holdings,
}: Props) {
  const maxWeight =
    holdings.length > 0
      ? Math.max(...holdings.map((h) => h.weight))
      : 1;

  return (
    <div className="min-h-[430px] rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Top Holdings
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {holdings.length} Stocks
        </span>

      </div>

      {holdings.length === 0 ? (

        <div className="rounded-xl bg-slate-50 p-8 text-center">

          <p className="text-gray-500">
            No holdings available.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {holdings.map((holding, index) => (

            <div
              key={
                holding.id ??
                `${holding.stockName}-${holding.sector}-${holding.weight}-${index}`
              }
              className="rounded-xl border p-4 transition hover:border-blue-300 hover:shadow-md"
            >

              <div className="mb-3 flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    {holding.stockName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {holding.sector ?? "Unknown"}
                  </p>

                </div>

                <span className="font-bold text-blue-600">
                  {holding.weight.toFixed(2)}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${(holding.weight / maxWeight) * 100}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}