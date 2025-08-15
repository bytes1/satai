import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

// Define a simplified interface for the result
interface ContractInterfaceResult {
  functions: any[];
  variables: any[];
  maps: any[];
}

export const getContractInterface = tool({
  description:
    "Get the ABI (Application Binary Interface) for a Stacks smart contract, showing its functions, variables, and maps.",
  parameters: z.object({
    contract_address: z.string().describe("The address of the smart contract."),
    contract_name: z.string().describe("The name of the smart contract."),
  }),
  execute: async function ({
    contract_address,
    contract_name,
  }): Promise<ContractInterfaceResult | string> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.testnet.hiro.so/v2/contracts/interface/${contract_address}/${contract_name}`
      );

      const contractInterface = response.data;

      if (!contractInterface) {
        return "Could not fetch the contract interface.";
      }

      return {
        functions: contractInterface.functions,
        variables: contractInterface.variables,
        maps: contractInterface.maps,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching contract interface:`, errorMessage);
      return `Failed to fetch contract interface: ${errorMessage}`;
    }
  },
});
