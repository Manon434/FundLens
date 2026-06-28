"use client";

import {
  Wallet,
  TrendingDown,
  ShieldAlert,
  BarChart3,
} from "lucide-react";

interface Props {
  result: any;
}

export default function StressResultCards({
  result,
}: Props) {
  if (!result) return null;

  const {
    currentValue,
    projectedValue,
    loss,
    lossPercentage,
  } = result.stress;

  const health =
    Math.max(
      0,
      Math.round(100 - lossPercentage)
    );

  return (
    <div className="grid gap-6 lg:grid-cols-4">

      {/* Current Value */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

        <Wallet
          className="text-blue-600"
          size={34}
        />

        <p className="mt-6 text-sm text-gray-500">
          Portfolio Value
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          ₹
          {Math.round(
            currentValue
          ).toLocaleString("en-IN")}
        </h2>

      </div>

      {/* After Crash */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

        <TrendingDown
          className="text-red-500"
          size={34}
        />

        <p className="mt-6 text-sm text-gray-500">
          Projected Value
        </p>

        <h2 className="mt-2 text-4xl font-bold text-red-600">
          ₹
          {Math.round(
            projectedValue
          ).toLocaleString("en-IN")}
        </h2>

      </div>

      {/* Portfolio Loss */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

        <ShieldAlert
          className="text-orange-500"
          size={34}
        />

        <p className="mt-6 text-sm text-gray-500">
          Estimated Loss
        </p>

        <h2 className="mt-2 text-4xl font-bold text-orange-600">
          ₹
          {Math.round(
            loss
          ).toLocaleString("en-IN")}
        </h2>

        <p className="mt-2 font-semibold text-red-500">
          {lossPercentage.toFixed(2)}%
        </p>

      </div>

      {/* Health */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

        <BarChart3
          className="text-green-600"
          size={34}
        />

        <p className="mt-6 text-sm text-gray-500">
          Portfolio Health
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-600">
          {health}/100
        </h2>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-green-500 transition-all duration-700"
            style={{
              width: `${health}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}