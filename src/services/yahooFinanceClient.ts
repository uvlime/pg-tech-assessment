import { IntradayBar } from "../types/stock";

interface YahooChartResponse {
  chart?: {
    error?: { description?: string } | null;
    result?: Array<{
      meta?: {
        symbol?: string;
        currency?: string;
        exchangeTimezoneName?: string;
      };
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          low?: Array<number | null>;
          high?: Array<number | null>;
          volume?: Array<number | null>;
        }>;
      };
    } | null> | null;
  };
}

export interface YahooStockData {
  symbol: string;
  currency: string | null;
  exchangeTimezone: string;
  bars: IntradayBar[];
}

export async function fetchYahooStockData(
  symbol: string,
): Promise<YahooStockData> {
  const url = new URL(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`,
  );
  url.searchParams.set("range", "1mo");
  url.searchParams.set("interval", "15m");

  const response = await fetch(url, {
    signal: AbortSignal.timeout(10_000),
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!response.ok) {
    throw new Error(`Yahoo Finance returned HTTP ${response.status}`);
  }

  const payload = (await response.json()) as YahooChartResponse;
  const chart = payload.chart;

  if (chart?.error) {
    throw new Error(chart.error.description ?? "Yahoo Finance returned an error");
  }

  const result = chart?.result?.[0];
  const quote = result?.indicators?.quote?.[0];
  const timestamps = result?.timestamp;

  if (!result || !quote || !timestamps) {
    throw new Error("No intraday data was returned for this symbol");
  }

  const bars = timestamps.map((timestamp, index): IntradayBar => ({
    timestamp,
    low: quote.low?.[index] ?? null,
    high: quote.high?.[index] ?? null,
    volume: quote.volume?.[index] ?? null,
  }));

  return {
    symbol: result.meta?.symbol ?? symbol,
    currency: result.meta?.currency ?? null,
    exchangeTimezone: result.meta?.exchangeTimezoneName ?? "UTC",
    bars,
  };
}

