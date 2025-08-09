import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface RecentTransaction {
  tx_id: string;
  tx_status: string;
  tx_type: string;
  sender_address: string;
  block_height: number;
  block_time_iso: string;
  fee_rate: string;
  nonce: number;
}

interface RecentTransactionsResult {
  transactions: RecentTransaction[];
}

export const getRecentTransactions = tool({
  description:
    "Get a list of recent transactions on the Stacks blockchain. call only when address give starts with ST",
  parameters: z.object({}),
  execute: async function (): Promise<RecentTransactionsResult | string> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/extended/v1/tx`
      );

      const transactions: RecentTransaction[] = response.data.results.map(
        (tx: any) => ({
          tx_id: tx.tx_id,
          tx_status: tx.tx_status,
          tx_type: tx.tx_type,
          sender_address: tx.sender_address,
          block_height: tx.block_height,
          block_time_iso: tx.block_time_iso,
          fee_rate: tx.fee_rate,
          nonce: tx.nonce,
        })
      );

      if (!transactions || transactions.length === 0) {
        return "No recent transactions found.";
      }

      return { transactions };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching recent transactions:`, errorMessage);
      return `Failed to fetch recent transactions: ${errorMessage}`;
    }
  },
});
