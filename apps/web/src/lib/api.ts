import type { StockSummaryResponse } from "../types/stock";

export async function fetchStockSummary(
  symbol: string,
): Promise<StockSummaryResponse> {
  const response = await fetch(
    `/api/stocks/${encodeURIComponent(symbol)}/daily-summary`,
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      body?.error?.message ?? `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return response.json() as Promise<StockSummaryResponse>;
}

