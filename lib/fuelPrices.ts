// Client-side data layer for live fuel prices. Fetches from our own
// /api/fuel-prices route (see app/api/fuel-prices/route.ts) rather than calling
// any upstream provider directly, so no API keys are ever exposed to the browser.
import axios from "axios";
import type { DepotPrice } from "@/data/mockContent";

export async function fetchDepotPrices(): Promise<DepotPrice[]> {
  const response = await axios.get<DepotPrice[]>("/api/fuel-prices");
  return response.data;
}
