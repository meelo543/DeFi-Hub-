import { PriceCard } from "./components/PriceCard";
import { StakingCalculator } from "./components/StakingCalculator";
import { YieldTable } from "./components/YieldTable";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            XRP DeFi Yield Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Compare APY across XRPL protocols and project your earnings
          </p>
        </header>

        <div className="space-y-6">
          <PriceCard />
          <YieldTable />
          <StakingCalculator />
        </div>

        <footer className="mt-10 text-center text-xs text-slate-500">
          Live XRP price via CoinGecko · APY data via DefiLlama (fallback to
          static when offline)
        </footer>
      </div>
    </div>
  );
}
