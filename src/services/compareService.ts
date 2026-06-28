export async function comparePortfolios(
  portfolioA: string,
  portfolioB: string
) {

  const res = await fetch(

    `/api/compare?portfolioA=${portfolioA}&portfolioB=${portfolioB}`

  );

  if (!res.ok) {

    throw new Error(
      "Comparison failed"
    );

  }

  return res.json();

}