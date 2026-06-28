"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  allocation: Record<string, number>;
}

const COLORS = [
  "#2563EB",
  "#14B8A6",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#10B981",
];

export default function AllocationChart({
  allocation,
}: Props) {
  const total = Object.values(allocation).reduce(
    (sum, value) => sum + value,
    0
  );

  const data = Object.entries(allocation).map(
    ([name, value]) => ({
      name,
      value,
      percentage: ((value / total) * 100).toFixed(1),
    })
  );

  return (
    <div className="min-h-[380px] rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Category Allocation
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {data.length} Categories
        </span>

      </div>

      <div className="h-[300px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={115}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            
         <Tooltip
       formatter={(value) => [
       `₹${Number(value ?? 0).toLocaleString("en-IN")}`,
       "Investment",
      ]}
     />

            <Legend
              verticalAlign="bottom"
              height={40}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}