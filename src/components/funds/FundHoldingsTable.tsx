"use client";

interface Holding {

  id: string;

  stockName: string;

  sector: string | null;

  weight: number;

}

interface Props {

  holdings: Holding[];

}

export default function FundHoldingsTable({
  holdings,
}: Props) {

  return (

    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">

        Top Holdings

      </h2>

      <div className="overflow-hidden rounded-xl border">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-4 text-left">

                Stock

              </th>

              <th className="px-5 py-4 text-left">

                Sector

              </th>

              <th className="px-5 py-4 text-right">

                Weight

              </th>

            </tr>

          </thead>

          <tbody>

            {holdings.map((holding) => (

              <tr
                key={holding.id}
                className="border-t"
              >

                <td className="px-5 py-4 font-medium">

                  {holding.stockName}

                </td>

                <td className="px-5 py-4">

                  {holding.sector}

                </td>

                <td className="px-5 py-4 text-right font-semibold text-blue-600">

                  {holding.weight.toFixed(2)}%

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}