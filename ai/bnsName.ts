import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface BnsNameResult {
  address: string;
  blockchain: string;
  expire_block: number;
  last_txid: string;
  status: string;
  zonefile_hash: string;
}

export const getBnsName = tool({
  description:
    "Get the address and other details for a BNS (Blockchain Naming System) name.",
  parameters: z.object({
    name: z.string().describe("The BNS name to resolve (e.g., satoshi.btc)"),
  }),
  execute: async function ({ name }): Promise<BnsNameResult | string> {
    try {
      // Corrected to use the testnet API
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/v1/names/${name}`
      );

      const nameInfo = response.data;

      if (!nameInfo || !nameInfo.address) {
        return "BNS name not found.";
      }

      return {
        address: nameInfo.address,
        blockchain: nameInfo.blockchain,
        expire_block: nameInfo.expire_block,
        last_txid: nameInfo.last_txid,
        status: nameInfo.status,
        zonefile_hash: nameInfo.zonefile_hash,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching BNS name:`, errorMessage);
      return `Failed to fetch BNS name: ${errorMessage}`;
    }
  },
});
