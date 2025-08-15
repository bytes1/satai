import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface PoxInfoResult {
  reward_cycle_id: number;
  total_liquid_stx: string;
  next_reward_cycle_in: string;
}

export const getPoxInfo = tool({
  description: "Get the current Stacks Proof of Transfer (PoX) information.",
  parameters: z.object({}),
  execute: async function (): Promise<PoxInfoResult | string> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/v2/pox`
      );

      const poxInfo = response.data;

      if (!poxInfo) {
        return "Could not fetch PoX information.";
      }

      return {
        reward_cycle_id: poxInfo.reward_cycle_id,
        total_liquid_stx: poxInfo.total_liquid_stx,
        next_reward_cycle_in: poxInfo.next_reward_cycle_in,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching PoX info:`, errorMessage);
      return `Failed to fetch PoX info: ${errorMessage}`;
    }
  },
});
