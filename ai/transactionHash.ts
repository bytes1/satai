import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface TransactionAnalysisResult {
  tx_id: string;
  tx_status: string;
  tx_type: string;
  sender_address: string;
  recipient_address?: string;
  block_height: number;
  block_time_iso: string;
  fee_rate: string;
  nonce: number;
  canonical: boolean;
  tx_result: string;
  events: any[];
}

export const getTransactionAnalysis = tool({
  description: "Get a detailed analysis of a transaction by its hash.",
  parameters: z.object({
    hash: z
      .string()
      .describe("The transaction hash to analyze (e.g., 0x123...abc)"),
  }),
  execute: async function ({
    hash,
  }): Promise<TransactionAnalysisResult | string> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/extended/v1/tx/${hash}`
      );

      const tx = response.data;

      if (!tx) {
        return "Transaction not found.";
      }

      // Extract relevant data
      const analysisResult: TransactionAnalysisResult = {
        tx_id: tx.tx_id,
        tx_status: tx.tx_status,
        tx_type: tx.tx_type,
        sender_address: tx.sender_address,
        recipient_address:
          tx.tx_type === "contract_call"
            ? tx.contract_call.contract_id
            : tx.token_transfer.recipient_address,
        block_height: tx.block_height,
        block_time_iso: tx.block_time_iso,
        fee_rate: tx.fee_rate,
        nonce: tx.nonce,
        canonical: tx.canonical,
        tx_result: tx.tx_result.repr,
        events: tx.events,
      };

      return analysisResult;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching transaction analysis:`, errorMessage);
      return `Failed to fetch transaction analysis: ${errorMessage}`;
    }
  },
});
