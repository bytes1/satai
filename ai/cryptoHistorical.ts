import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface Quote {
  timestamp: string;
  quote: {
    USD: {
      price: number;
    };
  };
}

interface CoinMarketCapResponse {
  data: {
    quotes: Quote[];
  };
}

interface HistoricalPriceResult {
  symbol: string;
  prices: Array<{ date: string; price: number }>;
}

export const cryptoHistoricalPrice = tool({
  description:
    "Fetch historical price data for a cryptocurrency for a specified number of days.",
  parameters: z.object({
    symbol: z
      .string()
      .describe("The crypto symbol to get the price for (e.g., BTC, ETH)")
      .refine((val) => ["BTC", "ETH", "USDT"].includes(val.toUpperCase()), {
        message: "Invalid cryptocurrency symbol",
      }),
    days: z
      .number()
      .int()
      .positive()
      .describe("Number of days to fetch historical data for (e.g., 7, 30)"),
  }),
  execute: async function ({ symbol, days }): Promise<HistoricalPriceResult> {
    const API_KEY = process.env.COINMARKETCAP_API_KEY;
    if (!API_KEY) {
      throw new Error("CoinMarketCap API key is not configured");
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const time_end = endDate.toISOString().split("T")[0];
    const time_start = startDate.toISOString().split("T")[0];

    try {
      const response: AxiosResponse<CoinMarketCapResponse> = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/ohlcv/historical",
        {
          headers: {
            "X-CMC_PRO_API_KEY": API_KEY,
            Accept: "application/json",
          },
          params: {
            symbol: symbol.toUpperCase(),
            time_start,
            time_end,
            convert: "USD",
            interval: "daily",
          },
        }
      );

      const prices = response.data.data.quotes.map((quote: Quote) => ({
        date: quote.timestamp.split("T")[0],
        price: quote.quote.USD.price,
      }));

      if (!prices.length) {
        throw new Error(
          `No price data available for ${symbol} for the last ${days} days`
        );
      }

      return { symbol, prices };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(
        `Error fetching historical prices for ${symbol} over ${days} days:`,
        errorMessage
      );
      throw new Error(`Failed to fetch historical prices: ${errorMessage}`);
    }
  },
});
