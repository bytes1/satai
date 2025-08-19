import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface StxSupplyResult {
  unlocked_percent: string;
  total_stx: string;
  unlocked_stx: string;
}

export const getStxSupply = tool({
  description: "Get the total and unlocked STX supply.",
  parameters: z.object({}),
  execute: async function (): Promise<StxSupplyResult | string> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/extended/v1/stx_supply`
      );

      const supplyInfo = response.data;

      if (!supplyInfo) {
        return "Could not fetch STX supply information.";
      }

      return {
        unlocked_percent: supplyInfo.unlocked_percent,
        total_stx: supplyInfo.total_stx,
        unlocked_stx: supplyInfo.unlocked_stx,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching STX supply:`, errorMessage);
      return `Failed to fetch STX supply: ${errorMessage}`;
    }
  },
});
