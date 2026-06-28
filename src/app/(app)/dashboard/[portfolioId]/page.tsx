"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import StatsCards from "@/components/dashboard/StatsCards";
import PortfolioHealth from "@/components/dashboard/PortfolioHealth";
import RiskMeter from "@/components/dashboard/RiskMeter";
import ExpenseCard from "@/components/dashboard/ExpenseCard";
import AllocationChart from "@/components/dashboard/AllocationChart";
import SectorChart from "@/components/dashboard/SectorChart";
import TopHoldings from "@/components/dashboard/TopHoldings";
import FundOverlap from "@/components/dashboard/FundOverlap";
import Insights from "@/components/dashboard/Insights";
import PortfolioXRay from "@/components/dashboard/PortfolioXRay";
import RebalancingAdvisor from "@/components/dashboard/RebalancingAdvisor";
import PortfolioGrade from "@/components/dashboard/PortfolioGrade";

import { getDashboard } from "@/services/dashboardService";

export default function DashboardPage() {

  const { portfolioId } = useParams();

  const [dashboard, setDashboard] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadDashboard() {

      try {

        if (!portfolioId) return;

        const data = await getDashboard(
          portfolioId as string
        );

        setDashboard(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadDashboard();

  }, [portfolioId]);

  if (loading) {

    return (

      <div className="flex h-full items-center justify-center text-lg font-semibold">

        Loading Dashboard...

      </div>

    );

  }

  if (!dashboard) {

    return (

      <div className="flex h-full items-center justify-center text-lg font-semibold text-red-600">

        Unable to load dashboard.

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-[1600px] space-y-10">

      <div>

        <h1 className="text-4xl font-bold">
          {dashboard.portfolio.name}
        </h1>

        <p className="mt-2 text-gray-500">
          Portfolio Analytics & Insights
        </p>

      </div>

      <StatsCards
        healthScore={dashboard.analytics.healthScore}
        totalInvestment={dashboard.analytics.totalInvestment}
        totalSip={dashboard.analytics.totalSip}
        risk={dashboard.analytics.risk}
      />

      <div className="grid gap-6 lg:grid-cols-3">

        <PortfolioHealth
          score={dashboard.analytics.healthScore}
        />

        <RiskMeter
          risk={dashboard.analytics.risk}
        />

        <PortfolioGrade
          grade={dashboard.analytics.grade}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <ExpenseCard
          expense={dashboard.analytics.averageExpenseRatio}
        />

        <AllocationChart
          allocation={dashboard.analytics.categoryAllocation}
        />

      </div>

      <SectorChart
        sectors={dashboard.analytics.sectorAllocation}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <TopHoldings
          holdings={dashboard.topHoldings}
        />

        <FundOverlap
          overlaps={dashboard.overlaps}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <PortfolioXRay
          healthScore={dashboard.analytics.healthScore}
          diversificationScore={dashboard.analytics.diversificationScore}
          averageExpenseRatio={dashboard.analytics.averageExpenseRatio}
          overlapPercentage={dashboard.analytics.overlapPercentage}
          risk={dashboard.analytics.risk}
        />

       <RebalancingAdvisor
    risk={dashboard.analytics.risk}
    overlapPercentage={dashboard.analytics.overlapPercentage}
    averageExpenseRatio={dashboard.analytics.averageExpenseRatio}
    diversificationScore={dashboard.analytics.diversificationScore}
   />
      </div>

      <Insights
        recommendations={dashboard.analytics.recommendations}
      />

    </div>

  );

}