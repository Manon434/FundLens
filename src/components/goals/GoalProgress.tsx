"use client";

interface Props {
  current: number;
  target: number;
}

export default function GoalProgress({
  current,
  target,
}: Props) {

  const percentage = Math.min(
    (current / target) * 100,
    100
  );

  return (
    <div className="mt-4">

      <div className="mb-2 flex justify-between text-sm">

        <span>Progress</span>

        <span>{percentage.toFixed(1)}%</span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-green-500 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}