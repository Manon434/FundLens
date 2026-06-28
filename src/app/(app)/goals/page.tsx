"use client";

import { useEffect, useState } from "react";

import GoalForm from "@/components/goals/GoalForm";
import GoalCard from "@/components/goals/GoalCard";

import { getGoals } from "@/services/goalService";

export default function GoalsPage() {

  const [goals, setGoals] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadGoals() {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")!
      );

      const data = await getGoals(user.id);

      setGoals(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadGoals();

  }, []);

  if (loading) {

    return (

      <div className="flex h-full items-center justify-center">

        Loading Goals...

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">

          Financial Goals

        </h1>

        <p className="mt-2 text-gray-500">

          Plan and track your future investments.

        </p>

      </div>

      <GoalForm
        onCreated={loadGoals}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        {goals.length === 0 && (

          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <h2 className="text-xl font-semibold">

              No Goals Yet

            </h2>

            <p className="mt-2 text-gray-500">

              Create your first financial goal.

            </p>

          </div>

        )}

        {goals.map((goal) => (

          <GoalCard
            key={goal.id}
            title={goal.title}
            targetAmount={goal.targetAmount}
            timelineYears={goal.timelineYears}
          />

        ))}

      </div>

    </div>

  );

}