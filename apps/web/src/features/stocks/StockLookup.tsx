import { useState, type FormEvent } from "react";
import { DailySummaryTable } from "../../components/DailySummaryTable";
import { fetchStockSummary } from "../../lib/api";
import type { StockSummaryResponse } from "../../types/stock";

export function StockLookup() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState<StockSummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedSymbol = symbol.trim().toUpperCase();
    if (!normalizedSymbol) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchStockSummary(normalizedSymbol);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <form className="search" onSubmit={handleSubmit}>
        <label htmlFor="symbol">Stock symbol</label>
        <div className="search-row">
          <input
            id="symbol"
            name="symbol"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
            placeholder="e.g. AAPL"
            autoComplete="off"
            maxLength={20}
          />
          <button type="submit" disabled={isLoading || !symbol.trim()}>
            {isLoading ? "Loading…" : "Get summary"}
          </button>
        </div>
      </form>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {result && (
        <section className="results" aria-live="polite">
          <h2>
            {result.symbol}{" "}
            <span>
              Daily summary · {result.range} · {result.interval}
            </span>
          </h2>
          <p className="timezone">
            Dates shown in {result.exchangeTimezone}
          </p>
          <DailySummaryTable rows={result.data} currency={result.currency} />
        </section>
      )}
    </section>
  );
}

