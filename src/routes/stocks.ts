import { Router } from "express";
import { z } from "zod";
import { aggregateDaily } from "../services/dailyAggregator";
import { fetchYahooStockData } from "../services/yahooFinanceClient";

export const stocksRouter = Router();

const symbolSchema = z
  .string()
  .trim()
  .min(1)
  .max(20)
  .regex(/^[A-Za-z0-9.^=_-]+$/);

stocksRouter.get("/:symbol/daily-summary", async (req, res) => {
  const parsedSymbol = symbolSchema.safeParse(req.params.symbol);

  if (!parsedSymbol.success) {
    return res.status(400).json({
      error: {
        code: "INVALID_SYMBOL",
        message: "Provide a valid stock symbol.",
      },
    });
  }

  try {
    const stock = await fetchYahooStockData(parsedSymbol.data.toUpperCase());
    const data = aggregateDaily(stock.bars, stock.exchangeTimezone);

    return res.json({
      symbol: stock.symbol,
      currency: stock.currency,
      exchangeTimezone: stock.exchangeTimezone,
      interval: "15m",
      range: "1mo",
      data,
    });
  } catch (error) {
    console.error("Stock data request failed:", error);

    return res.status(502).json({
      error: {
        code: "UPSTREAM_DATA_ERROR",
        message: "Could not retrieve intraday data for this symbol.",
      },
    });
  }
});

