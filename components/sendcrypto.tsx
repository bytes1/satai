"use client";

import { Cl, PostConditionMode, Pc } from "@stacks/transactions";
import { openContractCall, openSTXTransfer } from "@stacks/connect";
import { useAuth } from "@/contexts/auth-context";
import { request } from "@stacks/connect";
type CryptosendProps = {
  address: string;
  amount: number;
};

export const Cryptosend = ({ address, amount }: CryptosendProps) => {
  const { isConnected, walletAddress } = useAuth();

  async function handleSend() {
    let pc = Pc.principal(walletAddress)
      .willSendEq(amount)
      .ft("ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token", "sbtc-token");
    try {
      const response = await request("stx_callContract", {
        contract: "ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token", // contract in format: address.contract-name for testnet
        functionName: "transfer", // name of the function to call
        functionArgs: [
          Cl.uint(amount), // amount in micro-STX
          Cl.standardPrincipal(walletAddress), // sender's principal (testnet address)
          Cl.standardPrincipal(address), // recipient's principal
          Cl.some(Cl.bufferFromUtf8(`${22}☕️${22}`)), // optional memo
        ],
        postConditions: [pc],
        postConditionMode: "deny",
        network: "testnet", // switch to testnet
      });

      console.log("Transaction successful:", response);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  }

  return (
    <div className="max-w-sm rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl p-6 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-purple-400/50">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        SBTC Send Information
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
