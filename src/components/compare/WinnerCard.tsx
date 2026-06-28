"use client";

interface Props {
  winner: string;
}

export default function WinnerCard({
  winner,
}: Props) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-sm">

      <p className="text-lg">
        Overall Winner
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        🏆 {winner}
      </h2>

    </div>
  );
}