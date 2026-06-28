"use client";

import { useEffect, useState } from "react";

import PortfolioSelector from "@/components/compare/PortfolioSelector";
import ComparisonSummary from "@/components/compare/ComparisonSummary";
import AllocationComparison from "@/components/compare/AllocationComparison";
import WinnerCard from "@/components/compare/WinnerCard";

import { comparePortfolios } from "@/services/compareService";
import { getPortfolios } from "@/services/portfolioService";

export default function ComparePage() {

  const [portfolios, setPortfolios] = useState<any[]>([]);

  const [portfolioA, setPortfolioA] = useState("");

  const [portfolioB, setPortfolioB] = useState("");

  const [comparison, setComparison] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    async function load() {

      const user = JSON.parse(
        localStorage.getItem("user")!
      );

      const data = await getPortfolios(user.id);

      setPortfolios(data);

    }

    load();

  }, []);

  async function handleCompare() {

    if (!portfolioA || !portfolioB) {

      alert("Select two portfolios");

      return;

    }

    if (portfolioA === portfolioB) {

      alert("Choose different portfolios");

      return;

    }

    setLoading(true);

    try {

      const data =
        await comparePortfolios(
          portfolioA,
          portfolioB
        );

      setComparison(data);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      <div>

        <h1 className="text-4xl font-bold">

          Portfolio Comparison

        </h1>

        <p className="mt-2 text-gray-500">

          Compare two portfolios side by side.

        </p>

      </div>

      <PortfolioSelector

        portfolios={portfolios}

        portfolioA={portfolioA}

        portfolioB={portfolioB}

        setPortfolioA={setPortfolioA}

        setPortfolioB={setPortfolioB}

        onCompare={handleCompare}

        loading={loading}

      />

      {comparison && (

        <>

          <WinnerCard

            winner={comparison.winner}

          />

          <ComparisonSummary

            left={comparison.left}

            right={comparison.right}

          />

          <AllocationComparison

            left={comparison.left.analytics.categoryAllocation}

            right={comparison.right.analytics.categoryAllocation}

          />

        </>

      )}

    </div>

  );

}