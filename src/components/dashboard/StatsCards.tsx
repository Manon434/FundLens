"use client";

interface Props {
  healthScore: number;
  totalInvestment: number;
  totalSip: number;
  risk: string;
}

export default function StatsCards({
  healthScore,
  totalInvestment,
  totalSip,
  risk,
}: Props) {

  const cards = [
    {
      title: "Portfolio Health",
      value: `${healthScore}/100`,
      color: "text-green-600",
      bg: "bg-green-50",
      icon: "💚",
    },
    {
      title: "Investment",
      value: `₹${totalInvestment.toLocaleString("en-IN")}`,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: "💰",
    },
    {
      title: "Monthly SIP",
      value: `₹${totalSip.toLocaleString("en-IN")}`,
      color: "text-purple-600",
      bg: "bg-purple-50",
      icon: "📈",
    },
    {
      title: "Risk Level",
      value: risk,
      color:
        risk === "Low"
          ? "text-green-600"
          : risk === "Moderate"
          ? "text-orange-500"
          : "text-red-600",
      bg:
        risk === "Low"
          ? "bg-green-50"
          : risk === "Moderate"
          ? "bg-orange-50"
          : "bg-red-50",
      icon: "⚠️",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`${card.bg} rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
        >

          <div className="mb-5 flex items-center justify-between">

            <p className="text-sm font-medium text-gray-500">
              {card.title}
            </p>

            <span className="text-2xl">
              {card.icon}
            </span>

          </div>

          <h2 className={`text-3xl font-bold ${card.color}`}>
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
}