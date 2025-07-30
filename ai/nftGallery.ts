import { tool } from "ai";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

interface NftAsset {
  id: string;
  number: number;
  address: string;
  mime_type: string;
  content_type: string;
  content_length: number;
  genesis_transaction: string;
  location: string;
  output: string;
  value: string;
  offset: string;
  timestamp: string;
}

interface NftGalleryResult {
  nfts: NftAsset[];
}

export const getNftGallery = tool({
  description: "Get a gallery of NFTs for a given wallet address.",
  parameters: z.object({
    address: z.string().describe("The wallet address to fetch NFTs for."),
  }),
  execute: async function ({ address }): Promise<NftGalleryResult | string> {
    const HIRO_API_KEY = process.env.HIRO_API_KEY;

    if (!HIRO_API_KEY) {
      throw new Error("Hiro API key is not configured");
    }

    try {
      const response: AxiosResponse<any> = await axios.get(
        `https://api.hiro.so/ordinals/v1/inscriptions?owner=${address}`,
        {
          headers: {
            "x-hiro-api-key": HIRO_API_KEY,
          },
        }
      );

      const nfts: NftAsset[] = response.data.results;

      if (!nfts || nfts.length === 0) {
        return "No NFTs found for this address.";
      }

      return { nfts };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error(`Error fetching NFT gallery:`, errorMessage);
      return `Failed to fetch NFT gallery: ${errorMessage}`;
    }
  },
});
