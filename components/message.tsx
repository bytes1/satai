"use client";

import type { Message } from "ai";
import { Crypto } from "./cryptoprice";
import { Cryptosend } from "./sendcrypto";
import { Depositbtc } from "./depositbtc";
import { Sendstx } from "./sendstx";

export default function Message({ message }: { message: Message }) {
  return (
    <div
      className={`flex gap-5 p-4 ${
        message.role === "assistant" ? "bg-gray-900 rounded-lg" : ""
      }`}
    >
      <div className="text-sm text-gray-500">
        {message.role === "user" ? "U" : "A"}
      </div>
      <div className="text-sm">{message.content}</div>

      {message.toolInvocations?.map((tool) => {
        const { toolName, toolCallId, state } = tool;

        if (state === "result") {
          if (toolName === "cryptoToolPrice") {
            return <Crypto key={toolCallId} {...tool.result} />;
          } else if (toolName === "Sendcrypto") {
            return <Cryptosend key={toolCallId} {...tool.result} />;
          } else if (toolName === "Convertbtc") {
            console.log("deposit btc triggered");
            return <Depositbtc key={toolCallId} {...tool.result} />;
          } else if (toolName === "Sendstx") {
            console.log("send stx triggered");
            return <Sendstx key={toolCallId} {...tool.result} />;
          }
        } else {
          if (toolName === "cryptoToolPrice") {
            return (
              <div key={toolCallId} className="text-sm text-yellow-400">
                Loading Coin price...
              </div>
            );
          } else if (toolName === "Sendcrypto") {
            return (
              <div key={toolCallId} className="text-sm text-yellow-400">
                Transaction processing...
              </div>
            );
          } else if (toolName === "Convertbtc") {
            return (
              <div key={toolCallId} className="text-sm text-yellow-400">
                Transaction processing...
              </div>
            );
          } else if (toolName === "Sendstx") {
            console.log("send stx triggered");
            return (
              <div key={toolCallId} className="text-sm text-yellow-400">
                Transaction processing...
              </div>
            );
          }
        }

        // Fallback if no matching condition
        return null;
      })}
    </div>
  );
}
