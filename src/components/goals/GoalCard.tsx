"use client";

import GoalProgress from "./GoalProgress";

interface Props {
  title: string;
  targetAmount: number;
  timelineYears: number;
}

export default function GoalCard({
  title,
  targetAmount,
  timelineYears,
}: Props) {

  const current = targetAmount * 0.18;

  const requiredSip =
    (targetAmount - current) /
    (timelineYears * 12);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <p className="text-gray-500">
            {timelineYears} Years
          </p>

        </div>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

          Goal

        </span>

      </div>

      <div className="mt-6 space-y-3">

        <p>

          <strong>Target:</strong>{" "}
          ₹{targetAmount.toLocaleString("en-IN")}

        </p>

        <p>

          <strong>Estimated Current:</strong>{" "}
          ₹{current.toLocaleString("en-IN")}

        </p>

        <p>

          <strong>Required SIP:</strong>{" "}
          ₹{requiredSip.toFixed(0)}/month

        </p>

      </div>

      <GoalProgress
        current={current}
        target={targetAmount}
      />

    </div>
  );
}