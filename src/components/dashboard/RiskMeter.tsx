"use client";

interface Props {
  risk: "Low" | "Moderate" | "High";
}

export default function RiskMeter({
  risk,
}: Props) {
  const color =
    risk === "Low"
      ? "bg-green-500"
      : risk === "Moderate"
      ? "bg-yellow-500"
      : "bg-red-500";

  const width =
    risk === "Low"
      ? "w-1/3"
      : risk === "Moderate"
      ? "w-2/3"
      : "w-full";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Risk Meter
      </h2>

      <div className="space-y-5">

        <div className="h-4 overflow-hidden rounded-full bg-slate-200">

          <div
            className={`${color} ${width} h-full rounded-full transition-all duration-700`}
          />

        </div>

        <div className="flex items-center justify-between">

          <span className="text-sm text-gray-500">
            Low
          </span>

          <span className="font-semibold">
            {risk} Risk
          </span>

          <span className="text-sm text-gray-500">
            High
          </span>

        </div>

      </div>

    </div>
  );
}