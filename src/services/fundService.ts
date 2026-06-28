export async function getFunds() {
  const res = await fetch("/api/funds");

  if (!res.ok) {
    throw new Error("Failed to fetch funds");
  }

  return res.json();
}

export async function getFund(id: string) {
  const res = await fetch(`/api/funds/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch fund");
  }

  return res.json();
}