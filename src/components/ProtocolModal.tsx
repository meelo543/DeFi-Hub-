import { useEffect } from "react";
import type { Protocol } from "../data/protocols";

type Props = {
  protocol: Protocol | null;
  onClose: () => void;
};

export function ProtocolModal({ protocol, onClose }: Props) {
  useEffect(() => {
    if (!protocol) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [protocol, onClose]);

  if (!protocol) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-2xl bg-slate-900 ring-1 ring-white/10 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-white/10 p-5">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {protocol.name}
            </h3>
            <p className="text-sm text-slate-400">
              Current APY · {protocol.apy.toFixed(2)}%
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 p-5">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              How it works
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
              {protocol.summary}
            </p>
          </section>
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              How it earns yield
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
              {protocol.yieldSource}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
