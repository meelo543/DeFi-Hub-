import { useMemo, useState } from "react";

export function StakingCalculator() {
  const [amount, setAmount] = useState("1000");
  const [apy, setApy] = useState("8");
  const [days, setDays] = useState("365");

  const { earnings, total, daily } = useMemo(() => {
    const a = Number(amount) || 0;
    const r = (Number(apy) || 0) / 100;
    const d = Number(days) || 0;
    const earnings = a * r * (d / 365);
    return {
      earnings,
      total: a + earnings,
      daily: d > 0 ? earnings / d : 0,
    };
  }, [amount, apy, days]);

  return (
    <section className="rounded-2xl bg-slate-900/60 p-5 ring-1 ring-white/10 sm:p-6">
      <header className="mb-5">
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Staking Calculator
        </h2>
        <p className="text-sm text-slate-400">
          Estimate projected earnings on a flat APY
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Amount (XRP)"
          value={amount}
          onChange={setAmount}
          step="any"
        />
        <Field label="APY (%)" value={apy} onChange={setApy} step="0.01" />
        <Field label="Days" value={days} onChange={setDays} step="1" />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Projected earnings" value={`${earnings.toFixed(4)} XRP`} />
        <Stat label="Total after period" value={`${total.toFixed(4)} XRP`} />
        <Stat label="Avg daily" value={`${daily.toFixed(6)} XRP`} />
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <input
        type="number"
        inputMode="decimal"
        min="0"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg bg-slate-950/60 px-3 py-2.5 text-white ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-950/40 p-4 ring-1 ring-inset ring-white/5">
      <div className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div className="mt-1 font-mono text-lg text-emerald-300">{value}</div>
    </div>
  );
}
