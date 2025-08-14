import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface TokenMetadataResult {
  name: string;
  symbol: string;
  decimals?: number;
  description: string;
  image_uri: string;
}

export const getTokenMetadata = tool({
  description: "Get metadata for a fungible or non-fungible token.",
  parameters: z.object({
    contractId: z
      .string()
      .describe(
        "The contract ID of the token (e.g., ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc-token)"
      ),
    tokenType: z
      .enum(["ft", "nft"])
      .describe("The type of the token (fungible or non-fungible)"),
  }),
  execute: async function ({
    contractId,
    tokenType,
  }): Promise<TokenMetadataResult | string> {
    const HIRO_API_KEY = process.env.HIRO_API_KEY;

    if (!HIRO_API_KEY) {
      throw new Error("Hiro API key is not configured");
    }

    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/metadata/v1/${tokenType}/${contractId}`,
        {
          headers: {
            "x-hiro-api-key": HIRO_API_KEY,
          },
        }
      );

      const metadata = response.data;
      console.log("metadata", metadata);
      if (!metadata) {
        return "Token metadata not found.";
      }

      return {
        name: metadata.name,
        symbol: metadata.symbol,
        decimals: metadata.decimals,
        description: metadata.description,
        image_uri: metadata.image_uri,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching token metadata:`, errorMessage);
      return `Failed to fetch token metadata: ${errorMessage}`;
    }
  },
});
