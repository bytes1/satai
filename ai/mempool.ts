import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface MempoolDataResult {
  pending_txs: number;
  fee_rates: {
    low: number;
    medium: number;
    high: number;
  };
}

export const getMempoolData = tool({
  description: "Get live data about the Stacks mempool.",
  parameters: z.object({}),
  execute: async function (): Promise<MempoolDataResult | string> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/extended/v1/tx/mempool`
      );

      const mempoolTxs = response.data.results;

      if (!mempoolTxs) {
        return "Could not fetch mempool data.";
      }

      const pending_txs = mempoolTxs.length;

      const fee_rates = mempoolTxs.map((tx: any) => parseInt(tx.fee_rate));
      const low = Math.min(...fee_rates);
      const high = Math.max(...fee_rates);
      const medium =
        fee_rates.reduce((a: number, b: number) => a + b, 0) / fee_rates.length;

      return {
        pending_txs,
        fee_rates: {
          low: low,
          medium: Math.round(medium),
          high: high,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching mempool data:`, errorMessage);
      return `Failed to fetch mempool data: ${errorMessage}`;
    }
  },
});
