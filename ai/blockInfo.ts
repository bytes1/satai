import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface BlockInfoResult {
  height: number;
  hash: string;
  parent_block_hash: string;
  burn_block_time_iso: string;
  canonical: boolean;
  txs: string[];
}

export const getBlockInfo = tool({
  description:
    "Get detailed information about a specific block by its height or hash.",
  parameters: z.object({
    identifier: z
      .string()
      .describe("The height or hash of the block to retrieve."),
  }),
  execute: async function ({ identifier }): Promise<BlockInfoResult | string> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/extended/v1/block/${identifier}`
      );

      const blockInfo = response.data;

      if (!blockInfo) {
        return "Could not fetch block information.";
      }

      return {
        height: blockInfo.height,
        hash: blockInfo.hash,
        parent_block_hash: blockInfo.parent_block_hash,
        burn_block_time_iso: blockInfo.burn_block_time_iso,
        canonical: blockInfo.canonical,
        txs: blockInfo.txs,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching block info:`, errorMessage);
      return `Failed to fetch block info: ${errorMessage}`;
    }
  },
});
