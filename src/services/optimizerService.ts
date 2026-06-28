export async function runStressTest(

  portfolioId: string,

  scenario: string

) {

  const res = await fetch(

    `/api/optimizer?portfolioId=${portfolioId}&scenario=${encodeURIComponent(
      scenario
    )}`

  );

  if (!res.ok)
    throw new Error("Stress test failed");

  return res.json();

}