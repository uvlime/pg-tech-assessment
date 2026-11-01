import { DailySummary, IntradayBar } from "../types/stock";

function getDateInTimezone(timestamp: number, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(timestamp * 1000));

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function aggregateDaily(
  bars: IntradayBar[],
  timeZone: string,
): DailySummary[] {
  const groups = new Map<
    string,
    { lows: number[]; highs: number[]; volume: number }
  >();

  for (const bar of bars) {
    const date = getDateInTimezone(bar.timestamp, timeZone);
    const group = groups.get(date) ?? { lows: [], highs: [], volume: 0 };

    if (bar.low !== null && Number.isFinite(bar.low)) group.lows.push(bar.low);
    if (bar.high !== null && Number.isFinite(bar.high)) group.highs.push(bar.high);
    if (bar.volume !== null && Number.isFinite(bar.volume)) {
      group.volume += bar.volume;
    }

    groups.set(date, group);
  }

  return [...groups.entries()]
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, group]) => ({
      date,
      lowAverage: average(group.lows),
      highAverage: average(group.highs),
      volume: group.volume,
    }));
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(4));
}

