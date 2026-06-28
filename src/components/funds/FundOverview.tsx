"use client";

interface Props {

  fund: {

    name: string;

    category: string | null;

    expenseRatio: number | null;

    aum: number | null;

  };

}

export default function FundOverview({
  fund,
}: Props) {

  return (

    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h1 className="text-4xl font-bold">

        {fund.name}

      </h1>

      <p className="mt-2 text-gray-500">

        Mutual Fund Overview

      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-4">

        <div className="rounded-xl bg-slate-100 p-5">

          <p className="text-sm text-gray-500">

            Category

          </p>

          <h2 className="mt-2 text-xl font-bold">

            {fund.category}

          </h2>

        </div>

        <div className="rounded-xl bg-slate-100 p-5">

          <p className="text-sm text-gray-500">

            Expense Ratio

          </p>

          <h2 className="mt-2 text-xl font-bold">

            {fund.expenseRatio?.toFixed(2)}%

          </h2>

        </div>

        <div className="rounded-xl bg-slate-100 p-5">

          <p className="text-sm text-gray-500">

            AUM

          </p>

          <h2 className="mt-2 text-xl font-bold">

            ₹{fund.aum?.toLocaleString("en-IN")} Cr

          </h2>

        </div>

        <div className="rounded-xl bg-slate-100 p-5">

          <p className="text-sm text-gray-500">

            Holdings

          </p>

          <h2 className="mt-2 text-xl font-bold">

            Diversified

          </h2>

        </div>

      </div>

    </div>

  );

}