import { StockLookup } from "./features/stocks/StockLookup";

export default function App() {
  return (
    <main className="page">
      <div className="dashboard">
        <header>
          <p className="eyebrow">MARKET DATA</p>
          <h1>Intraday stock summary</h1>
          <p className="intro">
            View daily average intraday highs and lows, plus total volume.
          </p>
        </header>

        <StockLookup />
      </div>
    </main>
  );
}

