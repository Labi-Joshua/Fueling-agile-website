"use client";

// TanStack Query hook for live depot fuel prices. Any component can call this to
// get auto-refreshing price data without duplicating fetch/cache/refetch logic.
import { useQuery } from "@tanstack/react-query";
import { fetchDepotPrices } from "@/lib/fuelPrices";
import type { DepotPrice } from "@/data/mockContent";

// How often to poll for fresh prices while a price widget is on screen.
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export function useDepotPrices(initialPrices: DepotPrice[]) {
  return useQuery({
    queryKey: ["depot-prices"],
    queryFn: fetchDepotPrices,
    // Renders the server-provided mock/initial prices immediately, so the page
    // never shows an empty state while the first live fetch is in flight.
    initialData: initialPrices,
    refetchInterval: REFRESH_INTERVAL_MS,
  });
}
