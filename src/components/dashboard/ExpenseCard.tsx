"use client";

interface Props {
  expense: number;
}

export default function ExpenseCard({
  expense,
}: Props) {

  const status =
    expense <= 0.75
      ? "Excellent"

      : expense <= 1
      ? "Good"

      : expense <= 1.5
      ? "Average"

      : "High";

  const color =
    expense <= 1
      ? "text-green-600"

      : expense <= 1.5
      ? "text-yellow-600"

      : "text-red-600";

  return (
    <div className="min-h-[380px] rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-8 text-xl font-bold">
        Average Expense Ratio
      </h2>

      <h1 className="text-6xl font-bold text-blue-600">
        {expense.toFixed(2)}%
      </h1>

      <div className="mt-10 rounded-xl bg-slate-100 p-5">

        <h3 className={`text-xl font-bold ${color}`}>
          {status}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Lower expense ratios generally
          improve long-term investment
          returns.
        </p>

      </div>

    </div>
  );
}