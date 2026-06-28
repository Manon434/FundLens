// "use client";

// import { useEffect, useState } from "react";

// import { getPortfolios } from "@/services/portfolioService";
// import { runStressTest } from "@/services/optimizerService";

// import OptimizationSummary from "@/components/optimizer/OptimizationSummary";
// import WeakSectorTable from "@/components/optimizer/WeakSectorTable";
// import ReplacementSuggestions from "@/components/optimizer/ReplacementSuggestions";
// import OptimizationScore from "@/components/optimizer/OptimizationScore";
// import StressResultCards from "@/components/optimizer/StressResultCards";

// export default function OptimizerPage() {
//   const [portfolios, setPortfolios] = useState<any[]>([]);
//   const [portfolioId, setPortfolioId] = useState("");
//   const [scenario, setScenario] = useState("Market Crash");
//   const [result, setResult] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function load() {
//       try {
//         const storedUser = localStorage.getItem("user");

//         if (!storedUser) return;

//         const user = JSON.parse(storedUser);

//         const data = await getPortfolios(user.id);

//         setPortfolios(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     load();
//   }, []);

// //   async function simulate() {
// //     if (!portfolioId) return;

// //     try {
// //       setLoading(true);

// //       const data = await runStressTest(
// //         portfolioId,
// //         scenario
// //       );

// //       setResult(data);
// //     } catch (error) {
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// async function simulate() {
//   if (!portfolioId) return;

//   setLoading(true);

//   try {
//     const data = await runStressTest(
//       portfolioId,
//       scenario
//     );

//     console.log("API:", data);

//     setResult(data);

//     console.log("State updated");
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// }

// console.log("Current Result:", result);

//   return (
//     <div className="mx-auto max-w-[1700px] space-y-10">

//       {/* Hero */}

//       <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 text-white shadow-xl">

//         <h1 className="text-5xl font-bold">
//           Portfolio Optimizer
//         </h1>

//         <p className="mt-4 text-lg text-blue-100">
//           Simulate market events, identify weak areas,
//           and discover smarter fund replacements.
//         </p>

//       </div>

//       {/* Controls */}

//       <div className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-3">

//         <select
//           value={portfolioId}
//           onChange={(e) =>
//             setPortfolioId(e.target.value)
//           }
//           className="rounded-2xl border border-slate-300 bg-white p-4 outline-none transition focus:border-blue-500"
//         >
//           <option value="">
//             Select Portfolio
//           </option>

//           {portfolios.map((portfolio) => (
//             <option
//               key={portfolio.id}
//               value={portfolio.id}
//             >
//               {portfolio.name}
//             </option>
//           ))}
//         </select>

//         <select
//           value={scenario}
//           onChange={(e) =>
//             setScenario(e.target.value)
//           }
//           className="rounded-2xl border border-slate-300 bg-white p-4 outline-none transition focus:border-blue-500"
//         >
//           <option>Market Crash</option>
//           <option>IT Crash</option>
//           <option>Banking Crisis</option>
//           <option>Global Recession</option>
//           <option>Interest Rate Hike</option>
//         </select>

//         <button
//           onClick={simulate}
//           disabled={!portfolioId || loading}
//           className="rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
//         >
//           {loading
//             ? "Running Stress Test..."
//             : "Run Stress Test"}
//         </button>

//       </div>

//       {/* Results */}

//       {result && (

// <div className="space-y-10">

// <OptimizationSummary
// result={result}
// />

// <StressResultCards
// result={result}
// />

// <WeakSectorTable
// sectors={result.stress.impactedSectors}
// />

// <ReplacementSuggestions
// suggestions={result.replacementSuggestions}
// />

// <OptimizationScore
// result={result}
// />

// </div>

// )}

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import { getPortfolios } from "@/services/portfolioService";
import { runStressTest } from "@/services/optimizerService";

import OptimizationSummary from "@/components/optimizer/OptimizationSummary";
import StressResultCards from "@/components/optimizer/StressResultCards";
import WeakSectorTable from "@/components/optimizer/WeakSectorTable";
import ReplacementSuggestions from "@/components/optimizer/ReplacementSuggestions";

export default function OptimizerPage() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [portfolioId, setPortfolioId] = useState("");
  const [scenario, setScenario] = useState("Market Crash");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        const data = await getPortfolios(user.id);

        setPortfolios(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  async function simulate() {
    if (!portfolioId) {
      alert("Please select a portfolio first.");
      return;
    }

    setLoading(true);

    try {
      const data = await runStressTest(
        portfolioId,
        scenario
      );

      console.log(data);

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Stress Test Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 text-white">

        <h1 className="text-5xl font-bold">
          Portfolio Optimizer
        </h1>

        <p className="mt-3 text-blue-100">
          Stress test your mutual fund portfolio under
          real market conditions and discover better
          investment alternatives.
        </p>

      </div>

      <div className="grid gap-5 lg:grid-cols-3">

        <select
          value={portfolioId}
          onChange={(e) =>
            setPortfolioId(e.target.value)
          }
          className="rounded-xl border p-4"
        >
          <option value="">
            Select Portfolio
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
          value={scenario}
          onChange={(e) =>
            setScenario(e.target.value)
          }
          className="rounded-xl border p-4"
        >
          <option>Market Crash</option>
          <option>IT Crash</option>
          <option>Banking Crisis</option>
          <option>Global Recession</option>
          <option>Interest Rate Hike</option>
        </select>

        <button
          onClick={simulate}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-4 text-white font-semibold hover:bg-blue-700"
        >
          {loading
            ? "Running..."
            : "Run Stress Test"}
        </button>

      </div>

      {result && (
        <div className="space-y-8">

          <OptimizationSummary
            result={result}
          />

          <StressResultCards
            result={result}
          />

          <WeakSectorTable
            sectors={result.stress.impactedSectors}
          />

          <ReplacementSuggestions
            suggestions={
              result.replacementSuggestions
            }
          />

        </div>
      )}
    </div>
  );
}