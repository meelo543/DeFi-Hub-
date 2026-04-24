import type { Protocol, Risk } from "../data/protocols";

type LlamaPool = {
  pool: string;
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apy: number | null;
  apyBase: number | null;
  apyReward: number | null;
  ilRisk: "yes" | "no";
  exposure: "single" | "multi";
  poolMeta: string | null;
};

type LlamaResponse = { status: string; data: LlamaPool[] };

const PROJECT_INFO: Record<
  string,
  { name: string; summary: string; yieldSource: string }
> = {
  "ondo-yield-assets": {
    name: "Ondo OUSG (XRPL)",
    summary:
      "Tokenized short-term US Treasuries issued natively on the XRP Ledger. Holders own a claim on a BlackRock-managed treasury fund.",
    yieldSource:
      "Yield comes from interest on US government securities held in the underlying fund, distributed on-chain to OUSG token holders.",
  },
  "openeden-tbill": {
    name: "OpenEden TBL (XRPL)",
    summary:
      "OpenEden's tokenized US T-Bill product issued on the XRPL, redeemable 1:1 against short-duration treasuries.",
    yieldSource:
      "Underlying T-bill coupon yield accrues on-chain to the TBL token, net of management fees.",
  },
  kinetic: {
    name: "Kinetic FXRP (Flare)",
    summary:
      "Lending market on Flare where wrapped XRP (FXRP) can be supplied as collateral or lent for yield.",
    yieldSource:
      "Yield combines borrower interest paid into the FXRP supply pool plus FLR liquidity-mining rewards.",
  },
  "spectra-v2": {
    name: "Spectra v2 stXRP (Flare)",
    summary:
      "Spectra splits yield-bearing FXRP into principal (PT) and yield (YT) tokens, letting users trade fixed vs. variable yield.",
    yieldSource:
      "Returns come from the underlying FXRP staking yield, plus market premiums on PT/YT tokens until maturity.",
  },
  "spectra-metavaults": {
    name: "Spectra FXRP Metavault",
    summary:
      "Auto-compounding metavault that rotates FXRP across Spectra strategies to maximize blended yield.",
    yieldSource:
      "Combines FXRP base yield with rotating reward incentives (FLR and Spectra emissions).",
  },
  "sparkdex-v4": {
    name: "SparkDEX v4 (Flare)",
    summary:
      "Concentrated-liquidity DEX on Flare. Pairs include FXRP/stXRP and FXRP/USD₮0.",
    yieldSource:
      "Trading fees from FXRP swaps plus SparkDEX liquidity-mining incentives. Multi-asset pools carry impermanent-loss risk.",
  },
  "mystic-finance-lending": {
    name: "Mystic Finance (Flare)",
    summary:
      "Lending protocol on Flare offering markets for FXRP and FXRP derivatives.",
    yieldSource:
      "Borrower interest paid to suppliers, plus reward token emissions on supplied collateral.",
  },
};

function classifyRisk(p: LlamaPool): Risk {
  const apy = p.apy ?? 0;
  if (p.ilRisk === "yes" || p.exposure === "multi") return "high";
  if (apy >= 8) return "medium";
  return "low";
}

function describe(project: string): {
  name: string;
  summary: string;
  yieldSource: string;
} {
  return (
    PROJECT_INFO[project] ?? {
      name: project,
      summary: `On-chain pool tracked by DefiLlama under the "${project}" protocol.`,
      yieldSource:
        "Yield source not curated for this pool. Check DefiLlama or the protocol's own docs for breakdown.",
    }
  );
}

function isXrpRelated(p: LlamaPool): boolean {
  if (p.chain === "XRPL") return true;
  if (p.chain === "Flare" && /XRP/i.test(p.symbol)) return true;
  return false;
}

export async function fetchXrpYields(signal?: AbortSignal): Promise<Protocol[]> {
  const res = await fetch("https://yields.llama.fi/pools", { signal });
  if (!res.ok) throw new Error(`DefiLlama HTTP ${res.status}`);
  const json = (await res.json()) as LlamaResponse;

  const pools = json.data
    .filter(isXrpRelated)
    .filter((p) => p.apy !== null && p.apy > 0)
    .sort((a, b) => b.tvlUsd - a.tvlUsd)
    .slice(0, 8);

  return pools.map((p): Protocol => {
    const meta = describe(p.project);
    const symbolSuffix = p.poolMeta ? ` · ${p.poolMeta}` : "";
    return {
      id: p.pool,
      name: `${meta.name} — ${p.symbol}${symbolSuffix}`,
      apy: p.apy ?? 0,
      risk: classifyRisk(p),
      summary: meta.summary,
      yieldSource: meta.yieldSource,
    };
  });
}
