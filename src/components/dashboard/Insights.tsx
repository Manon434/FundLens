"use client";

interface Props {
  recommendations: string[];
}

export default function Insights({
  recommendations,
}: Props) {
  return (
    <div className="min-h-[420px] rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          Smart Recommendations
        </h2>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          AI Engine
        </span>

      </div>

      <div className="space-y-4">

        {recommendations.map((item, index) => {

          const priority = item.startsWith("HIGH")
            ? "HIGH"
            : item.startsWith("MEDIUM")
            ? "MEDIUM"
            : item.startsWith("LOW")
            ? "LOW"
            : "INFO";

          const color =
            priority === "HIGH"
              ? "border-red-500 bg-red-50"
              : priority === "MEDIUM"
              ? "border-yellow-500 bg-yellow-50"
              : priority === "LOW"
              ? "border-blue-500 bg-blue-50"
              : "border-green-500 bg-green-50";

          return (

            <div
              key={index}
              className={`rounded-xl border-l-4 p-4 ${color}`}
            >

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs font-bold">
                  {priority}
                </span>

                <span className="text-xs text-gray-500">
                  Recommendation #{index + 1}
                </span>

              </div>

              <p className="text-sm leading-6">
                {item.replace(
                  /^(HIGH|MEDIUM|LOW)\s•\s/,
                  ""
                )}
              </p>

            </div>

          );

        })}

      </div>

    </div>
  );
}