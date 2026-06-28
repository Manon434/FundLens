"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  sectors: Record<string, number>;
}

export default function SectorChart({
  sectors,
}: Props) {

  const data = Object.entries(sectors)
    .map(([sector, value]) => ({
      sector,
      value: Math.round(value),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="min-h-[420px] rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Sector Allocation
        </h2>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          {data.length} Sectors
        </span>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer>

          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="sector" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#2563EB"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}