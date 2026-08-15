"use client";

// TanStack Query hook for live depot fuel prices. Any component can call this to
// get auto-refreshing price data without duplicating fetch/cache/refetch logic.
import { useQuery } from "@tanstack/react-query";
import { fetchDepotPrices, type FuelFilter, type DepotPriceRow } from "@/lib/fuelPrices";
import type { DepotPrice } from "@/data/mockContent";

// How often to poll for fresh prices while a price widget is on screen.
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export function useDepotPrices(initialPrices: DepotPrice[], filter: FuelFilter = "pms") {
  // Placeholder rows need a `product` tag too (see DepotPriceRow) — the mock data
  // itself doesn't carry one, so it's stamped with "pms" as a reasonable default
  // (including under "all", since it's only shown briefly before the real fetch lands).
  const placeholderData: DepotPriceRow[] = initialPrices.map((row) => ({
    ...row,
    product: filter === "all" ? "pms" : filter,
  }));

  return useQuery({
    // filter is part of the query key so switching PMS/AGO/All fetches and caches
    // each one separately, rather than reusing another filter's data.
    queryKey: ["depot-prices", filter],
    queryFn: () => fetchDepotPrices(filter),
    // Shows the server-provided mock/initial prices immediately, so the page
    // never shows an empty state while a fetch is in flight. Uses placeholderData
    // (not initialData) so it's never mistaken for fresh cached data — every
    // filter switch still triggers a real fetch regardless of staleTime.
    placeholderData,
    refetchInterval: REFRESH_INTERVAL_MS,
  });
}
