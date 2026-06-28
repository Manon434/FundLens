export async function createGoal(data: {
  title: string;
  targetAmount: number;
  timelineYears: number;
  userId: string;
}) {

  const res = await fetch("/api/goals/create", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),

  });

  if (!res.ok) {
    throw new Error("Failed to create goal");
  }

  return res.json();

}

export async function getGoals(
  userId: string
) {

  const res = await fetch(
    `/api/goals/list?userId=${userId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch goals");
  }

  return res.json();

}