"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getFund } from "@/services/fundService";

import FundOverview from "@/components/funds/FundOverview";
import FundHoldingsTable from "@/components/funds/FundHoldingsTable";
import FundSectorChart from "@/components/funds/FundSectorChart";
import SimilarFunds from "@/components/funds/SimilarFunds";

export default function FundDetailsPage() {

  const { id } = useParams();

  const [fund, setFund] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadFund() {

      try {

        const data = await getFund(id as string);

        setFund(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    if (id) {

      loadFund();

    }

  }, [id]);

  if (loading) {

    return (

      <div className="flex h-full items-center justify-center text-lg font-semibold">

        Loading Fund...

      </div>

    );

  }

  if (!fund) {

    return (

      <div className="flex h-full items-center justify-center">

        Fund not found.

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      <FundOverview fund={fund.fund} />

      <div className="grid gap-6 lg:grid-cols-2">

        <FundSectorChart
          sectors={fund.sectorAllocation}
        />

        <SimilarFunds
          funds={fund.similarFunds}
        />

      </div>

      <FundHoldingsTable
        holdings={fund.fund.holdings}
      />

    </div>

  );

}