export type Risk = "low" | "medium" | "high";

export type Protocol = {
  id: string;
  name: string;
  apy: number;
  risk: Risk;
  summary: string;
  yieldSource: string;
};

export const PROTOCOLS: Protocol[] = [
  {
    id: "xrpl-amm",
    name: "XRP Ledger AMM",
    apy: 6.42,
    risk: "low",
    summary:
      "Native automated market maker built into the XRP Ledger. Liquidity providers deposit a paired asset (e.g. XRP/RLUSD) and receive LP tokens representing their share.",
    yieldSource:
      "Earnings come from swap fees collected by the AMM pool, distributed proportionally to LP token holders. Some pools also accrue trading rebates from auction slot bidders.",
  },
  {
    id: "sologenic",
    name: "Sologenic DEX",
    apy: 9.18,
    risk: "medium",
    summary:
      "Tokenization and DEX platform on the XRPL allowing users to trade tokenized stocks, ETFs, and SOLO-paired liquidity pairs.",
    yieldSource:
      "Yield is generated from market-making rewards on SOLO pairs and a share of platform trading fees paid to stakers of SOLO tokens.",
  },
  {
    id: "xls-30d",
    name: "XLS-30d Pools",
    apy: 7.85,
    risk: "low",
    summary:
      "Pools built on the XLS-30d AMM amendment, offering deep liquidity for stable and blue-chip XRPL token pairs.",
    yieldSource:
      "LPs earn from a portion of every swap fee plus periodic auction-slot rebates that lower effective trading fees for active arbitrageurs.",
  },
  {
    id: "flare-fassets",
    name: "Flare FAssets (FXRP)",
    apy: 12.4,
    risk: "high",
    summary:
      "Trustless wrapping of XRP onto the Flare network as FXRP, where it can be used in EVM-style DeFi protocols for lending and farming.",
    yieldSource:
      "Yield comes from FXRP minting fees, lending markets on Flare, and FLR liquidity-mining incentives. Higher risk due to bridge and smart-contract exposure.",
  },
  {
    id: "casinocoin",
    name: "CSC Yield Vault",
    apy: 14.6,
    risk: "high",
    summary:
      "Community-run yield vault that routes XRP into rotating XRPL strategies including AMM LPing and orderbook market-making.",
    yieldSource:
      "Returns come from active strategy execution and reinvested LP fees. Risk is elevated due to active management and dependency on third-party strategy operators.",
  },
];
