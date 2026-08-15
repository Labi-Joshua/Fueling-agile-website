// Client-side data layer for live fuel prices. Fetches from our own
// /api/fuel-prices route (see app/api/fuel-prices/route.ts) rather than calling
// any upstream provider directly, so no API keys are ever exposed to the browser.
import axios from "axios";
import type { DepotPrice } from "@/data/mockContent";

export type FuelProduct = "pms" | "ago";
// The fuel-type filter also allows "all", which merges every product's price
// list into one — the upstream API itself has no combined endpoint, so that
// merge happens client-side (see fetchDepotPrices below).
export type FuelFilter = FuelProduct | "all";

const ALL_PRODUCTS: FuelProduct[] = ["pms", "ago"];

// Every row is tagged with the product it came from, so the UI can label each
// row correctly even when multiple products are merged together under "all".
export type DepotPriceRow = DepotPrice & { product: FuelProduct };

async function fetchProduct(product: FuelProduct): Promise<DepotPriceRow[]> {
  const response = await axios.get<DepotPrice[]>("/api/fuel-prices", { params: { product } });
  return response.data.map((row) => ({ ...row, product }));
}

export async function fetchDepotPrices(filter: FuelFilter = "pms"): Promise<DepotPriceRow[]> {
  if (filter === "all") {
    const results = await Promise.all(ALL_PRODUCTS.map(fetchProduct));
    return results.flat();
  }
  return fetchProduct(filter);
}
