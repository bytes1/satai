import { tool } from "ai";
import { z } from "zod";
import axios from "axios";
import {
  fetchCallReadOnlyFunction,
  cvToString,
  ClarityType,
} from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";

export const getSbtcbalance = tool({
  description: "function to get token balance. when address is given.",
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
    console.log("balance funtion");
    const targetPath = `https://api.testnet.hiro.so/extended/v1/address/${address}/balances`;

    try {
      const { data } = await axios.get(targetPath, header);
      console.log("data", data);
      const fungibleTokens = data.fungible_tokens;
      console.log(fungibleTokens);
      let balances = [];

      // Return the balance for the account
      for (const tokenName in fungibleTokens) {
        const token = fungibleTokens[tokenName];
        const tokenComponents = tokenName.split("::");
        const contract = tokenComponents[0].split(".");
        const contractId = contract[0];
        const contractName = contract[1];

        try {
          // Fetch token decimals
          const decimalResult = await fetchCallReadOnlyFunction({
            contractName: contractName,
            contractAddress: contractId,
            functionName: "get-decimals",
            functionArgs: [],
            senderAddress: address,
            network: STACKS_TESTNET,
          });
          console.log("decimal result:", decimalResult);
          // Fetch token symbol
          const symbolResult = await fetchCallReadOnlyFunction({
            contractName: contractName,
            contractAddress: contractId,
            functionName: "get-symbol",
            functionArgs: [],
            senderAddress: address,
            network: STACKS_TESTNET,
          });
          console.log("symbol result:", symbolResult);

          // Extract values from the ClarityValue results
          let decimals = 8; // Default fallback
          let symbol = tokenName; // Default fallback

          // Parse decimals (usually returns a UIntCV)
          if (decimalResult && decimalResult.type === ClarityType.UInt) {
            decimals = parseInt(decimalResult.value.toString());
          }

          // Parse symbol (usually returns a StringAsciiCV or StringUtf8CV)
          if (symbolResult) {
            if (symbolResult.type === ClarityType.StringASCII) {
              symbol = (symbolResult as any).value;
            } else if (symbolResult.type === ClarityType.StringUTF8) {
              symbol = (symbolResult as any).value;
            } else {
              // Fallback: convert any ClarityValue to string
              symbol = cvToString(symbolResult).replace(/"/g, "");
            }
          }

          // Calculate human-readable balance

          const rawBalance = token.balance;
          const humanReadableBalance = (
            parseInt(rawBalance) / Math.pow(10, decimals)
          ).toFixed(decimals);

          balances.push({
            token: symbol,
            balance: humanReadableBalance,
            rawBalance: rawBalance,
            contractId: tokenName,
          });
          console.log("decimal", decimals);
          console.log("balance data:", balances);
        } catch (readOnlyError) {
          console.warn(
            `Failed to fetch token details for ${tokenName}:`,
            readOnlyError
          );
          // Fallback: use raw balance without proper formatting
          balances.push({
            token: tokenName,
            balance: token.balance,
            rawBalance: token.balance,
            contractId: tokenName,
          });
        }
      }
      console.log("balances outer", balances);
      // Format the response
      if (balances.length === 0) {
        return "No fungible tokens found for this address.";
      }

      return balances;
    } catch (error) {
      console.error("Error fetching token balances:", error);
      throw new Error(`Failed to fetch token balances: ${error}`);
    }
  },
});
