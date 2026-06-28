// export async function getDashboard(userId: string) {
//   const res = await fetch(`/api/dashboard?userId=${userId}`);

//   if (!res.ok) {
//     throw new Error("Failed to load dashboard");
//   }

//   return res.json();
// }

export async function getDashboard(
  portfolioId: string
) {

  const res = await fetch(
    `/api/dashboard/${portfolioId}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;

}