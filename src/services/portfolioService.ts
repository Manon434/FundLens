export async function createPortfolio(data: any) {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/portfolio/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function getPortfolios(
  userId: string
) {

  const res = await fetch(
    `/api/portfolio/list?userId=${userId}`
  );

  if (!res.ok)
    throw new Error("Failed to load portfolios");

  return res.json();

}

export async function deletePortfolio(
  id: string
) {

  const res = await fetch(
    "/api/portfolio/delete",
    {
      method: "DELETE",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        id,
      }),
    }
  );

  if (!res.ok)
    throw new Error("Delete failed");

}

export async function updatePortfolio(
  id: string,
  name: string
) {

  const res = await fetch(
    "/api/portfolio/update",
    {
      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        id,
        name,
      }),
    }
  );

  if (!res.ok)
    throw new Error("Update failed");

  return res.json();

}