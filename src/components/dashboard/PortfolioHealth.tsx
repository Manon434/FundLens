"use client";

interface Props {
  score: number;
}

export default function PortfolioHealth({
  score,
}: Props) {

  const color =
    score >= 85
      ? "border-green-500 text-green-600"
      : score >= 70
      ? "border-blue-500 text-blue-600"
      : score >= 50
      ? "border-yellow-500 text-yellow-600"
      : "border-red-500 text-red-600";

  const status =
    score >= 85
      ? "Excellent"
      : score >= 70
      ? "Good"
      : score >= 50
      ? "Average"
      : "Needs Improvement";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-8 text-xl font-bold">
        Portfolio Health
      </h2>

      <div className="flex flex-col items-center">

        <div
          className={`flex h-44 w-44 items-center justify-center rounded-full border-[12px] ${color}`}
        >

          <div className="text-center">

            <h1 className="text-5xl font-bold">
              {score}
            </h1>

            <p className="text-sm text-gray-500">
              /100
            </p>

          </div>

        </div>

        <p className="mt-6 text-lg font-semibold">
          {status}
        </p>

        <p className="mt-2 text-center text-sm text-gray-500">
          Overall Portfolio Health Score
        </p>

      </div>

    </div>
  );
}