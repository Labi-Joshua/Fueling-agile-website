"use client";

import { useMemo, useState } from "react";
import type { DepotPrice } from "@/data/mockContent";

export interface DepotPriceTableProps {
  prices: DepotPrice[];
}

const PAGE_SIZE = 10;

function formatNaira(value: number): string {
  return `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ChevronLeft() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M7.5 1.5L3 6l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M4.5 1.5L9 6l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 3L9 9M9 9H4M9 9V4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DepotPriceTable({ prices }: DepotPriceTableProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return prices;
    return prices.filter((row) => row.depot.toLowerCase().includes(q));
  }, [prices, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 pb-24 pt-24 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-brand-900">Depot Prices</span>
          <span className="flex items-center gap-1.5 rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-medium text-brand-500">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Live
          </span>
          <span className="text-xs text-brand-900/40">{prices.length} depots</span>
        </div>

        <select
          aria-label="Filter by fuel type"
          className="border border-brand-900/10 bg-white px-4 py-2 text-xs text-brand-900/70"
          defaultValue="pms"
        >
          <option value="">Fuel Type</option>
          <option value="pms">PMS</option>
          <option value="ago">AGO</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Search depots by name..."
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        className="mt-4 w-full border border-brand-900/10 bg-white px-4 py-3 text-sm text-brand-900 placeholder:text-brand-900/40 focus:border-brand-500/50 focus:outline-none"
      />

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-brand-900/10 text-xs uppercase tracking-wide text-brand-900/40">
              <th className="py-3 pr-4 font-medium">Depot</th>
              <th className="px-4 py-3 text-right font-medium">Price</th>
              <th className="px-4 py-3 text-right font-medium">Change</th>
              <th className="py-3 pl-4 text-right font-medium">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-900/5">
            {pageRows.map((row) => {
              const isUp = row.change > 0;
              const isFlat = row.change === 0;

              return (
                <tr key={row.depot}>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase text-brand-900">
                      {row.depot}
                      {row.verified && (
                        <span className="flex items-center gap-1 rounded-full bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium normal-case text-brand-500">
                          Verified
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-brand-900">
                    {formatNaira(row.price)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right ${
                      isFlat ? "text-brand-500" : isUp ? "text-brand-500" : "text-red-500"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {isFlat || isUp ? <ArrowUpRight /> : <ArrowDownRight />}
                      {Math.abs(row.change).toFixed(2)}
                      <span className="text-xs">
                        ({isUp ? "+" : isFlat ? "+" : ""}
                        {row.changePercent.toFixed(2)}%)
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pl-4 text-right text-xs text-brand-900/40">
                    {row.updated}
                  </td>
                </tr>
              );
            })}

            {pageRows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-brand-900/40">
                  No depots match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-xs text-brand-900/40">
          Showing {filtered.length === 0 ? 0 : pageStart + 1}-
          {Math.min(pageStart + PAGE_SIZE, filtered.length)} of {filtered.length}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-brand-900/70 hover:bg-brand-900/5 disabled:opacity-30"
          >
            <ChevronLeft />
            Prev
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`h-7 w-7 rounded-full text-xs font-medium ${
                n === currentPage
                  ? "bg-brand-500 text-white"
                  : "text-brand-900/70 hover:bg-brand-900/5"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-brand-900/70 hover:bg-brand-900/5 disabled:opacity-30"
          >
            Next
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
