"use client";

import Link from "next/link";

interface Fund {

  id: string;

  name: string;

  category: string | null;

  expenseRatio: number | null;

}

interface Props {

  funds: Fund[];

}

export default function SimilarFunds({
  funds,
}: Props) {

  return (

    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">

        Similar Funds

      </h2>

      <div className="space-y-4">

        {funds.map((fund) => (

          <Link
            key={fund.id}
            href={`/funds/${fund.id}`}
            className="block rounded-xl border p-4 transition hover:border-blue-500 hover:bg-slate-50"
          >

            <h3 className="font-semibold">

              {fund.name}

            </h3>

            <p className="mt-1 text-sm text-gray-500">

              {fund.category}

            </p>

            <p className="mt-2 text-blue-600 font-semibold">

              Expense Ratio : {fund.expenseRatio?.toFixed(2)}%

            </p>

          </Link>

        ))}

      </div>

    </div>

  );

}