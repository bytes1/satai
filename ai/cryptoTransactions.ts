import { tool } from "ai";
import { z } from "zod";

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
