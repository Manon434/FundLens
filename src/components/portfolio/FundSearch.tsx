"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Fund } from "@/types/fund";

interface FundSearchProps {
  funds: Fund[];
  onSelect: (fund: Fund) => void;
}

export default function FundSearch({
  funds,
  onSelect,
}: FundSearchProps) {
  const [query, setQuery] = useState("");

  const filteredFunds = useMemo(() => {
    if (!query.trim()) return [];

    return funds.filter((fund) =>
      fund.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, funds]);

  return (
    <div className="relative">

      <div className="relative">

        <Search
          className="absolute left-3 top-3.5 text-gray-400"
          size={18}
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Mutual Fund..."
          className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500"
        />

      </div>

      {filteredFunds.length > 0 && (

        <div className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border bg-white shadow-xl">

          {filteredFunds.map((fund) => (

            <button
              key={fund.id}
              onClick={() => {
                onSelect(fund);
                setQuery("");
              }}
              className="flex w-full flex-col border-b px-4 py-3 text-left hover:bg-slate-50"
            >

              <span className="font-medium">
                {fund.name}
              </span>

              <span className="mt-1 text-xs text-gray-500">

                {fund.category}

                {" • "}

                ER {fund.expenseRatio}%

                {" • "}

                ₹{fund.aum.toLocaleString()} Cr

              </span>

            </button>

          ))}

        </div>

      )}

    </div>
  );
}