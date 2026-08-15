// API route that the client-side fuel price widgets (DepotPriceTable, FuelPriceBanner)
// poll via TanStack Query. Runs on the server, so the upstream depot-price API's
// URL/key never reach the browser — the client only ever talks to this same-origin route
// (this also sidesteps CORS entirely, since server-to-server requests aren't subject to it).
//
// Upstream is a per-product endpoint (?product=pms|ago|lpg). Our own route accepts the
// same `product` query param (defaulting to "pms", matching the site's current single-list
// UI) and forwards it upstream. On missing config or any upstream failure, falls back to
// the mock depot prices in data/mockContent.ts, exactly like lib/api.ts does for the blog.
import { NextResponse } from "next/server";
import axios from "axios";
import { depotPrices, type DepotPrice } from "@/data/mockContent";

const endpoint = process.env.FUEL_PRICES_API_URL;
const apiKey = process.env.FUEL_PRICES_API_KEY;

const DEFAULT_PRODUCT = "pms";

interface UpstreamPriceRow {
  depot_name: string;
  state: string;
  ownership_verified: boolean;
  price: string;
  price_change: string;
  percent_change: string;
  recorded_at: string;
}

interface UpstreamResponse {
  fetchedAt: string;
  product: string;
  data: {
    product: string;
    prices: UpstreamPriceRow[];
  };
}

// Upstream gives a full ISO timestamp; the UI just wants a short "HH:MM" label
// (matching the mock data's `updated` field).
function formatUpdatedTime(recordedAt: string): string {
  const date = new Date(recordedAt);
  if (isNaN(date.getTime())) return recordedAt;
  return date.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Upstream's numeric fields (price, price_change, percent_change) are strings — our
// DepotPrice type expects numbers. `ownership_verified` maps directly onto our
// `verified` flag (same purpose: only verified depots surface on the homepage ticker).
function mapUpstreamPrices(rows: UpstreamPriceRow[]): DepotPrice[] {
  return rows.map((row) => ({
    depot: row.depot_name,
    verified: row.ownership_verified,
    price: parseFloat(row.price),
    change: parseFloat(row.price_change),
    changePercent: parseFloat(row.percent_change),
    updated: formatUpdatedTime(row.recorded_at),
  }));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product = searchParams.get("product") || DEFAULT_PRODUCT;

  if (!endpoint) {
    return NextResponse.json(depotPrices);
  }

  try {
    const response = await axios.get<UpstreamResponse>(endpoint, {
      params: { product },
      headers: apiKey ? { "X-Api-Key": apiKey } : undefined,
    });
    return NextResponse.json(mapUpstreamPrices(response.data.data.prices));
  } catch (error) {
    console.error("Failed to fetch live fuel prices, falling back to mock data:", error);
    return NextResponse.json(depotPrices);
  }
}
