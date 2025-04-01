"use client";

import Message from "@/components/message";
import { useChat } from "ai/react";
import { useAuth } from "@/contexts/auth-context";
import { Cl, PostConditionMode, Pc } from "@stacks/transactions";
import { openContractCall } from "@stacks/connect";
import { connect } from "@stacks/connect";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { isConnected, walletAddress, handleConnect, handleDisconnect } =
    useAuth();

  return (
    <div className="flex flex-col h-screen max-w-6xl w-full mx-auto">
      {/* Wallet connection button at the top */}
      <div className="p-4 flex justify-end">
        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {walletAddress.substring(0, 5)}...
              {walletAddress.substring(walletAddress.length - 4)}
            </span>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      {/* Chat input */}
      <div className="w-full p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg bg-transparent text-white outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 border rounded-lg hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
