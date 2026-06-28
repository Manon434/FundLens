"use client";

import {
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface Props {
  result: any;
}

export default function OptimizationSummary({
  result,
}: Props) {
  if (!result) return null;

  const {
    currentValue,
    projectedValue,
    loss,
    lossPercentage,
  } = result.stress;

  const resistance = Math.max(
    0,
    100 - Math.round(lossPercentage)
  );

  const severity =
    lossPercentage >= 30
      ? "Critical"
      : lossPercentage >= 20
      ? "High"
      : lossPercentage >= 10
      ? "Moderate"
      : "Low";

  const severityColor =
    severity === "Critical"
      ? "bg-red-100 text-red-700"
      : severity === "High"
      ? "bg-orange-100 text-orange-700"
      : severity === "Moderate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <section className="space-y-8">

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 text-white shadow-xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-4xl font-bold">
              {result.scenario.name}
            </h2>

            <p className="mt-3 max-w-3xl text-lg text-blue-100">
              {result.scenario.description}
            </p>

          </div>

          <span
            className={`rounded-full px-5 py-3 text-lg font-semibold ${severityColor}`}
          >
            {severity} Risk
          </span>

        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <ShieldCheck
            className="text-blue-600"
            size={34}
          />

          <p className="mt-6 text-gray-500">
            Current Value
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            ₹
            {Math.round(
              currentValue
            ).toLocaleString("en-IN")}
          </h3>

        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <TrendingDown
            className="text-red-600"
            size={34}
          />

          <p className="mt-6 text-gray-500">
            Projected Value
          </p>

          <h3 className="mt-2 text-4xl font-bold text-red-600">
            ₹
            {Math.round(
              projectedValue
            ).toLocaleString("en-IN")}
          </h3>

        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <AlertTriangle
            className="text-orange-500"
            size={34}
          />

          <p className="mt-6 text-gray-500">
            Expected Loss
          </p>

          <h3 className="mt-2 text-4xl font-bold text-orange-600">
            ₹
            {Math.round(loss).toLocaleString(
              "en-IN"
            )}
          </h3>

          <p className="mt-3 text-lg font-semibold text-red-500">
            {lossPercentage.toFixed(2)}%
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <TrendingUp
            className="text-green-600"
            size={34}
          />

          <p className="mt-6 text-gray-500">
            Crash Resistance
          </p>

          <h3 className="mt-2 text-4xl font-bold text-green-600">
            {resistance}/100
          </h3>

          <div className="mt-6 h-3 rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-green-500 transition-all duration-700"
              style={{
                width: `${resistance}%`,
              }}
            />

          </div>

        </div>

      </div>

    </section>
  );
}