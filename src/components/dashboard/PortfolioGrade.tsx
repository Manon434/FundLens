"use client";

interface Props {
  grade: string;
}

export default function PortfolioGrade({
  grade,
}: Props) {

  const color =
    grade.startsWith("A")
      ? "bg-green-100 text-green-700"

      : grade === "B"
      ? "bg-blue-100 text-blue-700"

      : grade === "C"
      ? "bg-yellow-100 text-yellow-700"

      : "bg-red-100 text-red-700";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Portfolio Grade
      </h2>

      <div className={`rounded-xl p-8 text-center ${color}`}>

        <h1 className="text-6xl font-bold">
          {grade}
        </h1>

      </div>

    </div>
  );
}