"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  getPortfolios,
  deletePortfolio,
} from "@/services/portfolioService";

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPortfolios() {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")!
      );

      const data = await getPortfolios(user.id);

      setPortfolios(data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load portfolios");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this portfolio?"
    );

    if (!confirmed) return;

    try {
      await deletePortfolio(id);

      toast.success("Portfolio deleted");

      loadPortfolios();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  }

  useEffect(() => {
    loadPortfolios();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-lg font-semibold">
        Loading Portfolios...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            My Portfolios
          </h1>

          <p className="mt-2 text-gray-500">
            View, edit and manage all your investment portfolios.
          </p>

        </div>

        <Link
          href="/portfolio/create"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Portfolio
        </Link>

      </div>

      {portfolios.length === 0 ? (

        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

          <h2 className="text-2xl font-semibold">
            No Portfolios Found
          </h2>

          <p className="mt-3 text-gray-500">
            Create your first portfolio to start analysing your investments.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {portfolios.map((portfolio) => {

            const totalInvestment =
              portfolio.holdings.reduce(
                (sum: number, holding: any) =>
                  sum + holding.amountInvested,
                0
              );

            const totalSip =
              portfolio.holdings.reduce(
                (sum: number, holding: any) =>
                  sum + (holding.monthlySip || 0),
                0
              );

            return (

              <div
                key={portfolio.id}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {portfolio.name}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">

                      <div>

                        <p className="text-gray-400">
                          Investment
                        </p>

                        <p className="font-semibold">
                          ₹
                          {totalInvestment.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                      <div>

                        <p className="text-gray-400">
                          Monthly SIP
                        </p>

                        <p className="font-semibold">
                          ₹
                          {totalSip.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                      <div>

                        <p className="text-gray-400">
                          Funds
                        </p>

                        <p className="font-semibold">
                          {portfolio.holdings.length}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="flex gap-3">

                    <Link
                      href={`/dashboard/${portfolio.id}`}
                      className="rounded-xl border p-3 transition hover:bg-slate-100"
                      title="View Dashboard"
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      href={`/portfolio/edit/${portfolio.id}`}
                      className="rounded-xl border p-3 transition hover:bg-slate-100"
                      title="Edit Portfolio"
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(portfolio.id)
                      }
                      className="rounded-xl border p-3 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete Portfolio"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}