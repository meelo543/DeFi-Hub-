import { useEffect, useState } from "react";
import { fetchXrpYields } from "../api/defiLlama";
import { PROTOCOLS, type Protocol } from "../data/protocols";

export type YieldsState = {
  data: Protocol[];
  loading: boolean;
  error: string | null;
  source: "live" | "fallback";
  updatedAt: Date | null;
};

export function useYields(): YieldsState {
  const [state, setState] = useState<YieldsState>({
    data: PROTOCOLS,
    loading: true,
    error: null,
    source: "fallback",
    updatedAt: null,
  });

  useEffect(() => {
    const ctrl = new AbortController();

    fetchXrpYields(ctrl.signal)
      .then((data) => {
        setState({
          data: data.length > 0 ? data : PROTOCOLS,
          loading: false,
          error: null,
          source: data.length > 0 ? "live" : "fallback",
          updatedAt: new Date(),
        });
      })
      .catch((e: unknown) => {
        if (ctrl.signal.aborted) return;
        setState({
          data: PROTOCOLS,
          loading: false,
          error: e instanceof Error ? e.message : "fetch failed",
          source: "fallback",
          updatedAt: new Date(),
        });
      });

    return () => ctrl.abort();
  }, []);

  return state;
}
