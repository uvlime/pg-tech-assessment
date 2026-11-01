export interface DailySummary {
  date: string;
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

