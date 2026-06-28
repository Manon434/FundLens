"use client";

import {
  AlertTriangle,
  TrendingDown,
} from "lucide-react";

interface Sector {
  sector: string;
  investment: number;
  change: number;
  projectedValue: number;
}

interface Props {
  sectors: Sector[];
}

export default function WeakSectorTable({
  sectors,
}: Props) {

  if (!sectors || sectors.length === 0)
    return null;

  const maxLoss = Math.max(
    ...sectors.map((s) => Math.abs(s.change))
  );

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center gap-4">

        <AlertTriangle
          className="text-red-500"
          size={32}
        />

        <div>

          <h2 className="text-3xl font-bold">

            Sector Stress Analysis

          </h2>

          <p className="text-gray-500">

            Sector-wise impact under the selected
            market scenario.

          </p>

        </div>

      </div>

      <div className="space-y-6">

        {sectors.map((sector) => {

          const width =
            (Math.abs(sector.change) /
              maxLoss) *
            100;

          return (

            <div
              key={sector.sector}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-red-300 hover:shadow-md"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex-1">

                  <h3 className="text-xl font-semibold">

                    {sector.sector}

                  </h3>

                  <p className="mt-2 text-gray-500">

                    Current Investment

                  </p>

                  <h4 className="text-2xl font-bold">

                    ₹
                    {Math.round(
                      sector.investment
                    ).toLocaleString("en-IN")}

                  </h4>

                </div>

                <div className="flex-1">

                  <p className="text-gray-500">

                    Projected Value

                  </p>

                  <h4 className="text-2xl font-bold text-red-600">

                    ₹
                    {Math.round(
                      sector.projectedValue
                    ).toLocaleString("en-IN")}

                  </h4>

                </div>

                <div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2">

                    <TrendingDown
                      className="text-red-600"
                      size={18}
                    />

                    <span className="font-semibold text-red-600">

                      {sector.change}%

                    </span>

                  </div>

                </div>

              </div>

              <div className="mt-6">

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-700"
                    style={{
                      width: `${width}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}