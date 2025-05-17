"use client";

import { useAuth } from "@/contexts/auth-context";
import { request } from "@stacks/connect";
type CryptosendProps = {
  address: string;
  amount: number;
};

export const Sendstx = ({ address, amount }: CryptosendProps) => {
  const { isConnected, walletAddress } = useAuth();

  async function handleSend() {
    try {
      const response = await request("stx_transferStx", {
        recipient: address, // recipient's STX address
        amount: amount.toString(), // amount in micro-STX as a string
        memo: `${22}☕️${22}`, // optional memo (optional, remove if unsupported)
        network: "testnet", // or "mainnet"
      });

      console.log("Transaction successful:", response);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }

  return (
    <div className="max-w-sm rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl p-6 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-purple-400/50">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        STX Send Information
      </h2>
      <div className="space-y-3">
        <p className="text-lg font-semibold">
          <span className="text-gray-300">Address:</span>{" "}
          <span className="text-purple-200 break-all">{address}</span>
        </p>
        <p className="text-lg font-semibold">
          <span className="text-gray-300">Amount:</span>{" "}
          <span className="text-green-300">{amount.toLocaleString()}</span>
        </p>
      </div>
      <button
        onClick={handleSend}
        disabled={!isConnected}
        className={`w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 ${
          !isConnected
            ? "opacity-50 cursor-not-allowed"
            : "hover:from-purple-600 hover:to-pink-600"
        }`}
      >
        {!isConnected ? "Connect Wallet First" : "Send Crypto"}
      </button>
    </div>
  );
};
