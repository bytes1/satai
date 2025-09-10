/**
 * @file This file handles the creation and configuration of the CoinGecko MCP client.
 */

import { experimental_createMCPClient as createMcpClient } from "ai";
import { coingeckoApiKey } from "./config";

/**
 * Creates the MCP client and returns its tools.
 * @returns {Promise<object>} A promise that resolves to the CoinGecko tools.
 */
export async function getMcpTools() {
  if (!coingeckoApiKey) {
    throw new Error(
      "COINGECKO_API_KEY environment variable is not set in mcp-client."
    );
  }
  const mcpClient = await createMcpClient({
    transport: {
      type: "sse",
      url: "https://mcp.api.coingecko.com/sse",
      headers: {
        x_cg_demo_api_key: coingeckoApiKey,
        "Content-Type": "application/json",
      },
    },
  });
  return mcpClient.tools();
}
