"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import FundSearch from "./FundSearch";
import FundTable from "./FundTable";
import SummaryCard from "./SummaryCard";

import { createPortfolio } from "@/services/portfolioService";
import { Fund } from "@/types/fund";
import { getFunds } from "@/services/fundService";
import { usePortfolioStore } from "@/store/portfolioStore";

export default function PortfolioForm() {
  const router = useRouter();

  const {
    portfolioName,
    setPortfolioName,
    funds,
    addFund,
    removeFund,
    totalInvestment,
    totalSip,
  } = usePortfolioStore();

  const [allFunds, setAllFunds] = useState<Fund[]>([]);

  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  const [amountInvested, setAmountInvested] = useState("");

  const [monthlySip, setMonthlySip] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFunds() {
      try {
        const data = await getFunds();
        setAllFunds(data);
      } catch {
        toast.error("Unable to load mutual funds");
      }
    }

    loadFunds();
  }, []);
    function handleAddFund() {
    if (!selectedFund) {
      toast.error("Please select a mutual fund");
      return;
    }

    if (!amountInvested || Number(amountInvested) <= 0) {
      toast.error("Enter a valid investment amount");
      return;
    }

    const exists = funds.some(
      (fund) => fund.fundId === selectedFund.id
    );

    if (exists) {
      toast.error("This fund is already added");
      return;
    }

    addFund({
      fundId: selectedFund.id,
      fundName: selectedFund.name,
      category: selectedFund.category,
      expenseRatio: selectedFund.expenseRatio,
      aum: selectedFund.aum,
      amountInvested: Number(amountInvested),
      monthlySip: Number(monthlySip) || 0,
    });

    setSelectedFund(null);
    setAmountInvested("");
    setMonthlySip("");

    toast.success("Fund added successfully");
  }

  async function handleAnalyzePortfolio() {
    if (!portfolioName.trim()) {
      toast.error("Enter portfolio name");
      return;
    }

    if (funds.length === 0) {
      toast.error("Add at least one mutual fund");
      return;
    }

  try {
  setLoading(true);

  // Temporary until auth is connected
 const storedUser = localStorage.getItem("user");

if (!storedUser) {
  toast.error("Please login first");
  router.push("/login");
  return;
}

const user = JSON.parse(storedUser);

  const portfolio = await createPortfolio({
    name: portfolioName,
    userId: user.id,
    holdings: funds,
  });

  toast.success("Portfolio created");

  router.push(`/dashboard/${portfolio.id}`);


      
    } catch {
      toast.error("Unable to create portfolio");
    } finally {
      setLoading(false);
    }
  }
    return (
    <div className="grid gap-8 lg:grid-cols-3">

      {/* Left Section */}

      <div className="lg:col-span-2">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            Portfolio Details
          </h2>

          <div className="space-y-5">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Portfolio Name
              </label>

              <input
                value={portfolioName}
                onChange={(e) =>
                  setPortfolioName(e.target.value)
                }
                placeholder="Long Term Wealth"
                className="w-full rounded-xl border p-3 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Search Mutual Fund
              </label>

              <FundSearch
                funds={allFunds}
                onSelect={(fund) => setSelectedFund(fund)}
              />

            </div>

            {selectedFund && (

              <div className="rounded-xl border bg-slate-50 p-4">

                <h3 className="font-semibold">
                  {selectedFund.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedFund.category}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                    Expense Ratio {selectedFund.expenseRatio}%
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    AUM ₹{selectedFund.aum.toLocaleString()} Cr
                  </span>

                </div>

              </div>

            )}

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Amount Invested
                </label>

                <input
                  type="number"
                  value={amountInvested}
                  onChange={(e) =>
                    setAmountInvested(e.target.value)
                  }
                  placeholder="50000"
                  className="w-full rounded-xl border p-3"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Monthly SIP
                </label>

                <input
                  type="number"
                  value={monthlySip}
                  onChange={(e) =>
                    setMonthlySip(e.target.value)
                  }
                  placeholder="5000"
                  className="w-full rounded-xl border p-3"
                />

              </div>

            </div>

            <button
              onClick={handleAddFund}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Add Fund
            </button>

          </div>

        </div>

        <FundTable
          funds={funds}
          onRemove={removeFund}
        />

      </div>

      {/* Right Section */}

      <SummaryCard
        totalFunds={funds.length}
        totalInvestment={totalInvestment()}
        totalSip={totalSip()}
        onAnalyze={handleAnalyzePortfolio}
      />

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

          <div className="rounded-xl bg-white px-8 py-6 shadow-xl">

            <p className="font-medium">
              Analyzing Portfolio...
            </p>

          </div>

        </div>
      )}

    </div>
  );
}