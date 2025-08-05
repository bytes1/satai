import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface ContractSourceResult {
  source: string;
  publish_height: number;
}

export const getContractSource = tool({
  description:
    "Get the source code of a Clarity smart contract by its address and name.",
  parameters: z.object({
    contract_address: z.string().describe("The address of the smart contract."),
    contract_name: z.string().describe("The name of the smart contract."),
  }),
  execute: async function ({
    contract_address,
    contract_name,
  }): Promise<ContractSourceResult | string> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/v2/contracts/source/${contract_address}/${contract_name}`
      );

      const contract = response.data;

      if (!contract || !contract.source) {
        return "Contract source code not found.";
      }

      return {
        source: contract.source,
        publish_height: contract.publish_height,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching contract source:`, errorMessage);
      return `Failed to fetch contract source: ${errorMessage}`;
    }
  },
});
