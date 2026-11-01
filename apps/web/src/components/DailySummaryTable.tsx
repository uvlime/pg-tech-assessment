import type { DailySummary } from "../types/stock";

interface Props {
  rows: DailySummary[];
  currency: string | null;
}

function formatPrice(value: number | null, currency: string | null): string {
  if (value === null) return "—";

  return new Intl.NumberFormat(undefined, {
    style: currency ? "currency" : "decimal",
    currency: currency ?? undefined,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
}

function formatVolume(volume: number): string {
  return new Intl.NumberFormat().format(volume);
}

export function DailySummaryTable({ rows, currency }: Props) {
  if (rows.length === 0) {
    return <p className="empty-state">No daily data was returned.</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Average low</th>
            <th>Average high</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.date}>
              <td>{row.date}</td>
              <td>{formatPrice(row.lowAverage, currency)}</td>
              <td>{formatPrice(row.highAverage, currency)}</td>
              <td>{formatVolume(row.volume)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

