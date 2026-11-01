import express from "express";
import { stocksRouter } from "./routes/stocks";

export const app = express();

app.use(express.json());
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/stocks", stocksRouter);

