import { useState } from "react";
import { PROTOCOLS, type Protocol, type Risk } from "../data/protocols";
import { ProtocolModal } from "./ProtocolModal";

const RISK_STYLES: Record<Risk, string> = {
  low: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  medium: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  high: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
};

function RiskBadge({ risk }: { risk: Risk }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${RISK_STYLES[risk]}`}
    >
      {risk}
    </span>
  );
}

export function YieldTable() {
  const [selected, setSelected] = useState<Protocol | null>(null);

  return (
    <section className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10">
      <header className="flex items-center justify-between p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Live Yield Comparison
          </h2>
          <p className="text-sm text-slate-400">
            APY across XRPL DeFi protocols
          </p>
        </div>
      </header>

      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead className="border-y border-white/10 bg-white/5 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-3 font-medium">Protocol</th>
              <th className="px-6 py-3 font-medium">APY</th>
              <th className="px-6 py-3 font-medium">Risk</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {PROTOCOLS.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.03]">
                <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                <td className="px-6 py-4 font-mono text-emerald-300">
                  {p.apy.toFixed(2)}%
                </td>
                <td className="px-6 py-4">
                  <RiskBadge risk={p.risk} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className="rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-white ring-1 ring-inset ring-white/10 hover:bg-white/10"
                  >
                    How it works
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-white/5 md:hidden">
        {PROTOCOLS.map((p) => (
          <li key={p.id} className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-white">{p.name}</div>
                <div className="mt-1 font-mono text-sm text-emerald-300">
                  {p.apy.toFixed(2)}% APY
                </div>
              </div>
              <RiskBadge risk={p.risk} />
            </div>
            <button
              type="button"
              onClick={() => setSelected(p)}
              className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/10 hover:bg-white/10"
            >
              How it works
            </button>
          </li>
        ))}
      </ul>

      <ProtocolModal protocol={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
