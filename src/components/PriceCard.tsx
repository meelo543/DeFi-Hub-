import { useEffect, useState } from "react";

type PriceState = {
  price: number | null;
  change24h: number | null;
  loading: boolean;
  error: string | null;
};

export function PriceCard() {
  const [state, setState] = useState<PriceState>({
    price: null,
    change24h: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd&include_24hr_change=true",
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;
        setState({
          price: json.ripple.usd,
          change24h: json.ripple.usd_24h_change,
          loading: false,
          error: null,
        });
      } catch (e) {
        if (cancelled) return;
        setState((s) => ({
          ...s,
          loading: false,
          error: e instanceof Error ? e.message : "fetch failed",
        }));
      }
    };

    fetchPrice();
    const id = setInterval(fetchPrice, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const positive = (state.change24h ?? 0) >= 0;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-[1px]">
      <div className="rounded-2xl bg-slate-900/90 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400">
              Live XRP Price
            </div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-white sm:text-4xl">
                {state.loading || state.price === null
                  ? "—"
                  : `$${state.price.toFixed(4)}`}
              </span>
              {state.change24h !== null && (
                <span
                  className={`text-sm font-medium ${
                    positive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {positive ? "+" : ""}
                  {state.change24h.toFixed(2)}% 24h
                </span>
              )}
            </div>
            {state.error && (
              <div className="mt-2 text-xs text-rose-300">
                Price feed error: {state.error}
              </div>
            )}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white sm:h-14 sm:w-14">
            XRP
          </div>
        </div>
      </div>
    </div>
  );
}
