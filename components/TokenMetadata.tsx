"use client";

import { motion } from "framer-motion";

interface TokenMetadataProps {
  name: string;
  symbol: string;
  decimals?: number;
  description: string;
  image_uri: string;
}

export const TokenMetadata = (props: TokenMetadataProps) => {
  return (
    <motion.div
      className="max-w-md mx-auto rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl p-8 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      role="region"
      aria-label="Token Metadata"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">
          {props.name} ({props.symbol})
        </h2>
        {props.image_uri && (
          <img
            src={props.image_uri}
            alt={props.name}
            className="w-16 h-16 rounded-full"
          />
        )}
      </div>
      <div className="space-y-4">
        <p className="text-gray-400">{props.description}</p>
        {props.decimals && (
          <div className="bg-black bg-opacity-20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500">Decimals</h3>
            <p className="text-md font-semibold truncate">{props.decimals}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
