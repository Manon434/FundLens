"use client";

import { SelectedFund } from "@/store/portfolioStore";

interface Props {
  funds: SelectedFund[];
  onRemove: (id: string) => void;
}

export default function FundTable({ funds, onRemove }: Props) {
  if (funds.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed p-8 text-center text-gray-500">
        No funds added yet.
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl border bg-white">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-4 py-3 text-left">Fund</th>

            <th className="px-4 py-3 text-right">
              Investment
            </th>

            <th className="px-4 py-3 text-right">
              Monthly SIP
            </th>

            <th className="px-4 py-3 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {funds.map((fund) => (

            <tr
              key={fund.fundId}
              className="border-t"
            >

              <td className="px-4 py-4 font-medium">
                {fund.fundName}
              </td>

              <td className="px-4 py-4 text-right">
                ₹{fund.amountInvested.toLocaleString()}
              </td>

              <td className="px-4 py-4 text-right">
                ₹{fund.monthlySip.toLocaleString()}
              </td>

              <td className="px-4 py-4 text-center">

                <button
                  onClick={() => onRemove(fund.fundId)}
                  className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                >
                  Remove
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}