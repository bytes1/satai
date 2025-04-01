"use client";

import { Cl, PostConditionMode, Pc } from "@stacks/transactions";
import { openContractCall, openSTXTransfer } from "@stacks/connect";
import { useAuth } from "@/contexts/auth-context";
import { request } from "@stacks/connect";
import { buildSbtcDepositAddress, SbtcApiClientTestnet, TESTNET } from "sbtc";
import { useState } from "react";
type CryptosendProps = {
  amount: number;
};

export const Depositbtc = ({ amount }: CryptosendProps) => {
  const { isConnected, walletAddress } = useAuth();
  let depositdata;

  const client = new SbtcApiClientTestnet();
  async function createDepositAddress() {
    return buildSbtcDepositAddress({
      network: TESTNET, // Use Mainnet if needed
      stacksAddress: walletAddress,
      signersPublicKey: await client.fetchSignersPublicKey(),
      reclaimPublicKey:
        "062bd2c825300d74f4f9feb6b2fec2590beac02b8938f0fc042a34254581ee69",
    });
  }

  // Example usage
  createDepositAddress().then((deposit) => {
    depositdata = deposit;
  });

  async function handleSend() {}

  return (
    <div className="max-w-sm rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl p-6 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-purple-400/50">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        BTC Deposit Information
      </h2>
      <div className="space-y-3">
        <p className="text-lg font-semibold">
          <span className="text-gray-300">Address:</span>
          {depositdata}
          <span className="text-purple-200 break-all">{""}</span>
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
