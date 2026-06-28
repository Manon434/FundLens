"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createGoal } from "@/services/goalService";

export default function GoalForm({
  onCreated,
}: {
  onCreated: () => void;
}) {

  const [title, setTitle] = useState("");

  const [targetAmount, setTargetAmount] =
    useState("");

  const [timelineYears, setTimelineYears] =
    useState("");

  async function handleSubmit() {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")!
      );

      await createGoal({

        title,

        targetAmount: Number(targetAmount),

        timelineYears: Number(timelineYears),

        userId: user.id,

      });

      toast.success("Goal Created");

      setTitle("");

      setTargetAmount("");

      setTimelineYears("");

      onCreated();

    } catch {

      toast.error("Unable to create goal");

    }

  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">

        Create Goal

      </h2>

      <div className="space-y-4">

        <input
          placeholder="Goal Name"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) =>
            setTargetAmount(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <input
          type="number"
          placeholder="Timeline (Years)"
          value={timelineYears}
          onChange={(e) =>
            setTimelineYears(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white"
        >
          Create Goal
        </button>

      </div>

    </div>
  );
}