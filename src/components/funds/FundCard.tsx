"use client";

import Link from "next/link";

interface Fund {
  id: string;
  name: string;
  category: string | null;
  expenseRatio: number | null;
  aum: number | null;
}

interface Props {
  fund: Fund;
}

export default function FundCard({ fund }: Props) {
  return (
    <Link
      href={`/funds/${fund.id}`}
      className="block rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <h2 className="text-xl font-bold">
        {fund.name}
      </h2>

      <p className="mt-2 text-gray-500">
        {fund.category ?? "Unknown"}
      </p>

      <div className="mt-6 space-y-3">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Expense Ratio
          </span>

          <span className="font-semibold text-blue-600">
            {fund.expenseRatio?.toFixed(2) ?? "0.00"}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            AUM
          </span>

          <span className="font-semibold">
            ₹{fund.aum?.toLocaleString("en-IN") ?? "0"} Cr
          </span>
        </div>

      </div>

      <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
        View Details
      </button>
    </Link>
  );
}