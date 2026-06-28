// "use client";

// import {
//   ArrowRight,
//   Shield,
//   TrendingDown,
//   BadgeCheck,
// } from "lucide-react";

// interface Props {
//   result: any;
// }

// export default function OptimizationScore({
//   result,
// }: Props) {
//   if (!result) return null;

//   const currentHealth =
//     result.analytics.healthScore;

//   const currentExpense =
//     result.analytics.averageExpenseRatio;

//   const currentLoss =
//     result.stress.loss;

//   const suggestions =
//     result.replacementSuggestions.length;

//   // Temporary estimated values.
//   // In the next phase these will come from the real optimizer.
//   const optimizedHealth = Math.min(
//     100,
//     currentHealth + suggestions * 4
//   );

//   const optimizedExpense = Math.max(
//     0.1,
//     currentExpense - suggestions * 0.08
//   );

//   const optimizedLoss =
//     currentLoss * 0.75;

//   const score = Math.round(
//     optimizedHealth -
//       optimizedExpense * 2
//   );

//   return (
//     <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">

//       <div className="mb-8 flex items-center gap-3">

//         <Shield
//           size={32}
//           className="text-green-400"
//         />

//         <div>

//           <h2 className="text-3xl font-bold">

//             Optimization Summary

//           </h2>

//           <p className="text-slate-300">

//             Estimated improvement after
//             applying all recommendations.

//           </p>

//         </div>

//       </div>

//       <div className="grid gap-6 lg:grid-cols-3">

//         {/* Health */}

//         <div className="rounded-2xl bg-white/10 p-6">

//           <h3 className="text-lg font-semibold">

//             Health Score

//           </h3>

//           <div className="mt-6 flex items-center gap-4">

//             <span className="text-4xl font-bold">

//               {currentHealth}

//             </span>

//             <ArrowRight />

//             <span className="text-4xl font-bold text-green-400">

//               {optimizedHealth}

//             </span>

//           </div>

//         </div>

//         {/* Expense */}

//         <div className="rounded-2xl bg-white/10 p-6">

//           <h3 className="text-lg font-semibold">

//             Expense Ratio

//           </h3>

//           <div className="mt-6 flex items-center gap-4">

//             <span className="text-4xl font-bold">

//               {currentExpense.toFixed(2)}%

//             </span>

//             <ArrowRight />

//             <span className="text-4xl font-bold text-green-400">

//               {optimizedExpense.toFixed(2)}%

//             </span>

//           </div>

//         </div>

//         {/* Loss */}

//         <div className="rounded-2xl bg-white/10 p-6">

//           <h3 className="text-lg font-semibold">

//             Crash Loss

//           </h3>

//           <div className="mt-6 flex items-center gap-4">

//             <span className="text-3xl font-bold">

//               ₹
//               {Math.round(
//                 currentLoss
//               ).toLocaleString("en-IN")}

//             </span>

//             <ArrowRight />

//             <span className="text-3xl font-bold text-green-400">

//               ₹
//               {Math.round(
//                 optimizedLoss
//               ).toLocaleString("en-IN")}

//             </span>

//           </div>

//         </div>

//       </div>

//       <div className="mt-8 rounded-2xl bg-blue-600 p-8">

//         <div className="flex items-center justify-between">

//           <div>

//             <p className="text-blue-100">

//               Portfolio Optimization Score

//             </p>

//             <h1 className="mt-2 text-6xl font-bold">

//               {score}/100

//             </h1>

//           </div>

//           <div className="text-right">

//             <BadgeCheck
//               size={40}
//               className="ml-auto text-green-300"
//             />

//             <p className="mt-3 text-lg">

//               {suggestions} Recommendations

//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }