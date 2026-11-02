# Prometheus Group Tech Assessment

Jack Miller - 2026-11-01

A React and TypeScript frontend backed by a Node.js API. The API fetches 15-minute stock data and returns daily average lows, daily average highs, and total volume.

## Prerequisites

- Node.js
- npm


## Setup

Install dependencies in each app:

```bash
cd pg-stock-dashboard/
npm install

cd apps/web
npm install
```

## Run locally

Start the API in one terminal:

```bash
cd pg-stock-dashboard/
npm run dev
```

The API runs at `http://localhost:3000`.

Start the frontend in a second terminal:

```bash
cd apps/web
npm run dev
```

Open the local URL Vite prints in the terminal, usually `http://localhost:5173`.

The Vite development server proxies `/api` requests to `http://localhost:3000`.


## Test the API

```http
GET http://localhost:3000/api/stocks/AAPL/daily-summary
```
