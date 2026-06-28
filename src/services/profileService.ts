export async function getProfile(
  userId: string
) {

  const res = await fetch(
    `/api/profile?userId=${userId}`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to load profile"
    );
  }

  return res.json();

}