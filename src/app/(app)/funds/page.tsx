"use client";

import { useEffect, useMemo, useState } from "react";
import { getFunds } from "@/services/fundService";
import FundCard from "@/components/funds/FundCard";

export default function FundsPage() {

  const [funds, setFunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  useEffect(() => {

    async function load() {

      try {

        const data = await getFunds();

        setFunds(data);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  const categories = useMemo(() => {

    return [
      "All",
      ...new Set(
        funds
          .map((f) => f.category)
          .filter(Boolean)
      ),
    ];

  }, [funds]);

  const filtered = funds.filter((fund) => {

    const searchMatch =
      fund.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      fund.category === category;

    return searchMatch && categoryMatch;

  });

  if (loading) {

    return (

      <div className="flex h-full items-center justify-center">

        Loading Funds...

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">

          Explore Mutual Funds

        </h1>

        <p className="mt-2 text-gray-500">

          Browse and compare available funds.

        </p>

      </div>

      <div className="flex gap-4">

        <input
          placeholder="Search funds..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 rounded-xl border p-3"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="rounded-xl border p-3"
        >

          {categories.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filtered.map((fund) => (

          <FundCard
            key={fund.id}
            fund={fund}
          />

        ))}

      </div>

    </div>

  );

}