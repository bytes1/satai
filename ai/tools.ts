import { tool } from "ai";
import { z } from "zod";
import axios from "axios";

export const cryptoToolPrice = tool({
  description:
    "Get price for a crypto currency. only execute when price is asked",
  parameters: z.object({
    symbol: z
      .string()
      .describe("The crypto symbol to get the price for (e.g., BTC, ETH)"),
  }),
  execute: async function ({ symbol }) {
    const API_KEY = "3ee319b8-e791-4822-a89b-e6287fa84c17"; // Replace with your CoinMarketCap API key
    const convert = "USD"; // Convert price to USD

    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";

    try {
      // Make the API request using Axios
      const response = await axios.get(url, {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
          Accept: "application/json",
        },
        params: {
          symbol: symbol.toUpperCase(), // Ensure the symbol is in uppercase
          convert: convert,
        },
      });

      // Extract the price from the response
      const price =
        response.data.data[symbol.toUpperCase()].quote[convert].price;

      // Return the symbol and price
      return { symbol, price };
    } catch (error) {
      // Handle errors
      throw new Error("Failed to fetch crypto price");
    }
  },
});

export const Sendcrypto = tool({
  description:
    "function to send crypto when address(crypto address) and amount is given. then only execute this when send sbtc",
  parameters: z.object({
    address: z
      .string()
      .describe("the blockchain address of person. token need to send"),
    amount: z.string().describe("Amount of tokens need to send"),
  }),
  execute: async function ({ address, amount }) {
    // Simulated API call

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { address, amount };
  },
});

export const Convertbtc = tool({
  description: "function to convert btc to sbtc. when amount is given.",
  parameters: z.object({
    amount: z.string().describe("Amount of tokens need to deposit"),
  }),
  execute: async function ({ amount }) {
    // Simulated API call

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return { amount };
  },
});

export const Sendstx = tool({
  description:
    "function to send crypto when address(crypto address) and amount is given. then only execute this when send stx",
  parameters: z.object({
    address: z
      .string()
      .describe("the blockchain address of person. token need to send"),
    amount: z.string().describe("Amount of tokens need to send"),
  }),
  execute: async function ({ address, amount }) {
    // Simulated API call

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { address, amount };
  },
});

export const tools = {
  cryptoToolPrice,
  Sendcrypto,
  Convertbtc,
  Sendstx,
};
