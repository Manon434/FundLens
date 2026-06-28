import { StressScenario } from "./optimizerTypes";

export const scenarios: StressScenario[] = [

  {
    id: "market-crash",

    name: "Market Crash",

    description:
      "Broad equity market correction affecting nearly all sectors.",

    severity: "High",

    sectorChanges: {

      Banking: -25,

      IT: -28,

      Pharma: -12,

      FMCG: -8,

      Energy: -18,

      Auto: -22,

      Realty: -30,

      Metals: -24,

      Telecom: -14,

    },

  },

  {

    id: "it-crash",

    name: "IT Crash",

    description:
      "Technology stocks experience a sharp selloff.",

    severity: "High",

    sectorChanges: {

      IT: -40,

      Banking: -5,

      Pharma: 6,

      FMCG: 5,

      Energy: 2,

      Auto: -10,

      Realty: -8,

    },

  },

  {

    id: "banking-crisis",

    name: "Banking Crisis",

    description:
      "Financial sector experiences heavy losses.",

    severity: "High",

    sectorChanges: {

      Banking: -35,

      IT: -10,

      Pharma: 8,

      FMCG: 5,

      Energy: -5,

      Realty: -20,

      Auto: -12,

    },

  },

  {

    id: "recession",

    name: "Global Recession",

    description:
      "Worldwide economic slowdown impacts equity markets.",

    severity: "High",

    sectorChanges: {

      Banking: -22,

      IT: -18,

      Pharma: 5,

      FMCG: -5,

      Energy: -16,

      Realty: -32,

      Auto: -25,

      Metals: -20,

    },

  },

  {

    id: "rate-hike",

    name: "Interest Rate Hike",

    description:
      "Aggressive interest rate increases by the central bank.",

    severity: "Medium",

    sectorChanges: {

      Banking: 8,

      Realty: -32,

      Auto: -18,

      FMCG: -6,

      IT: -10,

      Energy: -4,

    },

  },

];