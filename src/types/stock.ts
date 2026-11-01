export interface IntradayBar {
  timestamp: number; // Unix timestamp in seconds
  low: number | null;
  high: number | null;
  volume: number | null;
}

export interface DailySummary {
  date: string; // YYYY-MM-DD in the exchange timezone
  lowAverage: number | null;
  highAverage: number | null;
  volume: number;
}

export interface StockSummaryResponse {
  symbol: string;
  currency: string | null;
  exchangeTimezone: string;
  interval: "15m";
  range: "1mo";
  data: DailySummary[];
}

