"use client";

import {
  ArrowRight,
  BadgeCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Suggestion {
  currentFund: string;
  replacement: string;
  currentExpense: number;
  replacementExpense: number;
  currentAUM: number;
  replacementAUM: number;
  expectedImprovement: number;
  reason: string;
}

interface Props {
  suggestions: Suggestion[];
}

export default function ReplacementSuggestions({
  suggestions,
}: Props) {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">

        <Sparkles
          size={48}
          className="mx-auto text-blue-500"
        />

        <h2 className="mt-5 text-2xl font-bold">
          No Better Alternatives Found
        </h2>

        <p className="mt-3 text-gray-500">
          Your current portfolio already looks well
          diversified based on the available funds.
        </p>

      </div>
    );
  }

  return (

    <div className="rounded-3xl border bg-white p-8 shadow-sm">

      <div className="mb-10 flex items-center gap-4">

        <Sparkles
          size={32}
          className="text-blue-600"
        />

        <div>

          <h2 className="text-3xl font-bold">
            Smart Fund Replacement Engine
          </h2>

          <p className="text-gray-500">
            AI-inspired optimization using expense,
            AUM and diversification.
          </p>

        </div>

      </div>

      <div className="space-y-8">

        {suggestions.map((item, index) => (

          <div
            key={index}
            className="rounded-3xl border border-slate-200 p-8 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
          >

            <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

              {/* Left */}

              <div className="flex-1">

                <div className="flex items-center gap-5">

                  <div>

                    <p className="text-sm text-gray-500">

                      Current Fund

                    </p>

                    <h3 className="text-2xl font-bold">

                      {item.currentFund}

                    </h3>

                  </div>

                  <ArrowRight
                    size={28}
                    className="text-blue-600"
                  />

                  <div>

                    <p className="text-sm text-gray-500">

                      Suggested Fund

                    </p>

                    <h3 className="text-2xl font-bold text-green-600">

                      {item.replacement}

                    </h3>

                  </div>

                </div>

                <div className="mt-6 inline-flex rounded-full bg-green-100 px-5 py-2">

                  <BadgeCheck
                    size={18}
                    className="mr-2 text-green-600"
                  />

                  <span className="font-semibold text-green-700">

                    Recommended

                  </span>

                </div>

              </div>

              {/* Right */}

              <div className="grid gap-5 lg:grid-cols-4">

                <div className="rounded-2xl bg-slate-50 p-5">

                  <p className="text-sm text-gray-500">

                    Expense Ratio

                  </p>

                  <div className="mt-3 flex items-center gap-3">

                    <span className="font-bold">

                      {item.currentExpense.toFixed(2)}%

                    </span>

                    <TrendingDown
                      className="text-red-500"
                      size={18}
                    />

                  </div>

                  <h4 className="mt-2 text-xl font-bold text-green-600">

                    {item.replacementExpense.toFixed(2)}%

                  </h4>

                </div>

                <div className="rounded-2xl bg-slate-50 p-5">

                  <p className="text-sm text-gray-500">

                    AUM

                  </p>

                  <div className="mt-3">

                    <p className="font-semibold">

                      ₹
                      {Math.round(
                        item.currentAUM
                      ).toLocaleString("en-IN")}
                      Cr
                    </p>

                    <TrendingUp
                      className="my-2 text-green-600"
                      size={18}
                    />

                    <h4 className="font-bold text-green-600">

                      ₹
                      {Math.round(
                        item.replacementAUM
                      ).toLocaleString("en-IN")}
                      Cr
                    </h4>

                  </div>

                </div>

                <div className="rounded-2xl bg-blue-50 p-5">

                  <p className="text-sm text-gray-500">

                    Improvement

                  </p>

                  <h2 className="mt-4 text-4xl font-bold text-blue-600">

                    +{item.expectedImprovement}

                  </h2>

                </div>

                <div className="rounded-2xl bg-green-50 p-5">

                  <p className="text-sm text-gray-500">

                    Reason

                  </p>

                  <p className="mt-4 font-semibold text-green-700">

                    {item.reason}

                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}