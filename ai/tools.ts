import { tool } from "ai";
import { z } from "zod";
import axios from "axios";

/**
 * Gets the current USD price of a cryptocurrency
 * Uses CoinMarketCap API
 * Executes only when user asks for a token's price
 */
export const cryptoToolPrice = tool({
  description:
    "Get price for a crypto currency. only execute when price is asked",
  parameters: z.object({
    symbol: z
      .string()
      .describe("The crypto symbol to get the price for (e.g., BTC, ETH)"),
  }),
  execute: async function ({ symbol }) {
    /**
     * Fetches price from CoinMarketCap and returns { symbol, price }.
     * Rendered in /components/cryptoprice.tsx.
     */

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

/**
 * Tool used to send SBTC tokens to another user.
 * Triggered when the user asks the AI agent to send a specific amount of SBTC to an address
 * (e.g., "send 1 SBTC to [address]").
 */

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
    /**
     * The AI agent returns the recipient address and amount based on the user's request.
     * These values are rendered in /components/sendcrypto.tsx, where the user can review
     * and confirm the transaction.
     */

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { address, amount };
  },
});

/**
 * Utility for converting BTC to sBTC.
 * Triggered when the user asks the AI agent to convert a specific amount
 * (e.g., "convert [amount] BTC to sBTC").
 */

export const Convertbtc = tool({
  description: "function to convert btc to sbtc. when amount is given.",
  parameters: z.object({
    amount: z.string().describe("Amount of tokens need to deposit"),
  }),
  execute: async function ({ amount }) {
    /**
     * The AI agent returns the BTC amount to be converted.
     * This value is rendered in /components/deposit.tsx, where the user can review
     * and confirm the transaction.
     */

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return { amount };
  },
});

/**
 * Tool used to send SBTC tokens to another user.
 * Triggered when the user asks the AI agent to send a specific amount of STX to an address
 * (e.g., "send 1 STX to [address]").
 */

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
    /**
     * The AI agent returns the recipient address and amount based on the user's request.
     * These values are rendered in /components/sendstx.tsx, where the user can review
     * and confirm the transaction.
     */

    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { address, amount };
  },
});

/**
 * Utility to fetch the balance of an STX-20 token.
 * Triggered when the user asks the AI agent to retrieve a specific token balance
 * (e.g., "Check my sBTC tokens").
 */

export const getSbtcbalance = tool({
  description:
    "function to  get sbtc balance of user. call when sbtc balance is asked",
  parameters: z.object({
    address: z
      .string()
      .describe("address of wallet token balance need to fetch"),
  }),
  execute: async function ({ address }) {
    let header = undefined;
    if (process.env.HIRO_API_KEY) {
      header = {
        headers: {
          "X-API-Key": process.env.HIRO_API_KEY,
        },
      };
    }
    const targetPath = `https://api.hiro.so/extended/v1/address/${address}/balances`;
    try {
      const { data } = await axios.get(targetPath, header);
      const fungibleTokens = data.fungible_tokens;
      let balances = "";
      // Return the balance for the account
      for (const tokenName in fungibleTokens) {
        const token = fungibleTokens[tokenName];
        const tokenComponents = tokenName.split("::");
        const contract = tokenComponents[0].split(".");
        const contractId = contract[0];
        const contractName = contract[1];
      }
      return balances;
    } catch (error) {
      throw error;
    }
  },
});

export const tools = {
  cryptoToolPrice,
  Sendcrypto,
  Convertbtc,
  Sendstx,
};
