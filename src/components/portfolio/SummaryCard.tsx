"use client";

interface Props {
  totalFunds: number;
  totalInvestment: number;
  totalSip: number;
  onAnalyze: () => void;
}

export default function SummaryCard({
  totalFunds,
  totalInvestment,
  totalSip,
  onAnalyze,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Portfolio Summary
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span>Total Funds</span>
          <span className="font-semibold">
            {totalFunds}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Total Investment</span>
          <span className="font-semibold">
            ₹{totalInvestment.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Monthly SIP</span>
          <span className="font-semibold">
            ₹{totalSip.toLocaleString()}
          </span>
        </div>

        <div className="border-t pt-5">

          <button
            onClick={onAnalyze}
            disabled={totalFunds === 0}
            className={`w-full rounded-lg py-3 font-semibold text-white transition ${
              totalFunds === 0
                ? "cursor-not-allowed bg-gray-400"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            Analyze Portfolio
          </button>

        </div>

      </div>
    </div>
  );
}