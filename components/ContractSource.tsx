"use client";

import { motion } from "framer-motion";
import { FaCode, FaCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";

type ContractSourceProps = {
  source: string;
  publish_height: number;
  contract_address: string;
  contract_name: string;
};

// Advanced Clarity Syntax Highlighter
const HighlightedClarityCode = ({ code }: { code: string }) => {
  const highlight = (line: string) => {
    // Comments (;; and beyond)
    line = line.replace(/(;;.*)/g, '<span class="text-gray-500">$1</span>');
    // Strings (double quoted)
    line = line.replace(/(".*?")/g, '<span class="text-green-400">$1</span>');
    // Principals ('SP... or contract address)
    line = line.replace(
      /('SP[A-Z0-9]+)/g,
      '<span class="text-yellow-400">$1</span>'
    );
    // Keywords (define-*, let, if, etc.)
    line = line.replace(
      /\b(define-data-var|define-fungible-token|define-non-fungible-token|define-public|define-private|define-read-only|define-map|define-trait|impl-trait|use-trait|let|if|begin|match|asserts!|try!)\b/g,
      '<span class="text-purple-400 font-medium">$1</span>'
    );
    // Functions and special forms
    line = line.replace(
      /\b(ok|err|some|none|as-contract|contract-call\?|stx-transfer\?|var-get|var-set|map-set|map-get\?|nft-mint\?|nft-transfer\?|ft-mint\?|ft-transfer\?|get-block-info\?)\b/g,
      '<span class="text-cyan-400">$1</span>'
    );
    // Numbers (u for uint, or just numbers)
    line = line.replace(
      /\b(u\d+|\d+)\b/g,
      '<span class="text-orange-400">$1</span>'
    );
    // Booleans
    line = line.replace(
      /\b(true|false)\b/g,
      '<span class="text-orange-400">$1</span>'
    );
    // Parentheses
    line = line.replace(/(\(|\))/g, '<span class="text-gray-600">$1</span>');
    return line;
  };

  return (
    <div className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
      {code.split("\n").map((line, i) => (
        <div key={i} className="flex items-start">
          <span className="text-gray-600 w-10 text-right pr-4 select-none">
            {i + 1}
          </span>
          <span
            className="flex-1"
            dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
          />
        </div>
      ))}
    </div>
  );
};

export const ContractSource = (props: ContractSourceProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.source).then(
      () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      },
      () => {
        // Handle copy failure if needed
      }
    );
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto rounded-2xl bg-[#1E1E1E] border border-gray-700/50 shadow-2xl text-white transform transition-all duration-500 hover:shadow-purple-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="region"
      aria-label="Contract Source Code"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <FaCode className="text-2xl text-purple-400" />
          <div>
            <h2 className="font-bold tracking-tight">{props.contract_name}</h2>
            <p className="text-xs text-gray-400 truncate">
              {props.contract_address}
            </p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-3 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-all duration-200 ${
            isCopied ? "text-green-400" : ""
          }`}
        >
          {isCopied ? <FaCheck /> : <FaCopy />}
          <span>{isCopied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 bg-black/20 max-h-[500px] overflow-y-auto">
        <HighlightedClarityCode code={props.source} />
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-800/30 text-right text-xs text-gray-500 rounded-b-2xl">
        Published at block height: {props.publish_height}
      </div>
    </motion.div>
  );
};
