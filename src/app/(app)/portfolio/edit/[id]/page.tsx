"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  getPortfolios,
  updatePortfolio,
} from "@/services/portfolioService";

export default function EditPortfolioPage() {

  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");

  async function loadPortfolio() {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")!
      );

      const portfolios = await getPortfolios(
        user.id
      );

      const portfolio = portfolios.find(
        (p: any) => p.id === id
      );

      if (!portfolio) {

        toast.error("Portfolio not found");

        router.push("/portfolio");

        return;

      }

      setName(portfolio.name);

    } catch {

      toast.error("Unable to load portfolio");

    } finally {

      setLoading(false);

    }

  }

  async function handleSave() {

    if (!name.trim()) {

      toast.error("Portfolio name required");

      return;

    }

    try {

      await updatePortfolio(
        id as string,
        name
      );

      toast.success("Portfolio updated");

      router.push("/portfolio");

    } catch {

      toast.error("Update failed");

    }

  }

  useEffect(() => {

    loadPortfolio();

  }, []);

  if (loading) {

    return (

      <div className="flex h-full items-center justify-center">

        Loading...

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-3xl">

      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <h1 className="mb-8 text-3xl font-bold">

          Edit Portfolio

        </h1>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block font-medium">

              Portfolio Name

            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div className="flex gap-4">

            <button
              onClick={handleSave}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
            >
              Save Changes
            </button>

            <button
              onClick={() =>
                router.push("/portfolio")
              }
              className="rounded-xl border px-6 py-3"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}