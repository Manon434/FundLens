"use client";

interface Props {

  portfolios: any[];

  portfolioA: string;

  portfolioB: string;

  setPortfolioA: (id: string) => void;

  setPortfolioB: (id: string) => void;

  onCompare: () => void;

  loading: boolean;

}

export default function PortfolioSelector({

  portfolios,

  portfolioA,

  portfolioB,

  setPortfolioA,

  setPortfolioB,

  onCompare,

  loading,

}: Props) {

  return (

    <div className="rounded-2xl bg-white p-8 shadow-sm">

      <div className="grid gap-6 md:grid-cols-3">

        <select

          className="rounded-xl border p-3"

          value={portfolioA}

          onChange={(e) =>

            setPortfolioA(e.target.value)

          }

        >

          <option value="">

            Portfolio A

          </option>

          {portfolios.map((portfolio) => (

            <option

              key={portfolio.id}

              value={portfolio.id}

            >

              {portfolio.name}

            </option>

          ))}

        </select>

        <select

          className="rounded-xl border p-3"

          value={portfolioB}

          onChange={(e) =>

            setPortfolioB(e.target.value)

          }

        >

          <option value="">

            Portfolio B

          </option>

          {portfolios.map((portfolio) => (

            <option

              key={portfolio.id}

              value={portfolio.id}

            >

              {portfolio.name}

            </option>

          ))}

        </select>

        <button

          onClick={onCompare}

          disabled={loading}

          className="rounded-xl bg-blue-600 text-white font-semibold"

        >

          {loading

            ? "Comparing..."

            : "Compare"}

        </button>

      </div>

    </div>

  );

}