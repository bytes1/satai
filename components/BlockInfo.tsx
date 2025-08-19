"use client";

import { motion } from "framer-motion";
import { FaCube } from "react-icons/fa";

type BlockInfoProps = {
  height: number;
  hash: string;
  parent_block_hash: string;
  burn_block_time_iso: string;
  canonical: boolean;
  txs: string[];
};

export const BlockInfo = (props: BlockInfoProps) => {
  return (
    <motion.div
      className="max-w-2xl mx-auto rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl p-8 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <FaCube className="text-xl text-cyan-400" />
        <h2 className="text-xl font-bold">Block Information</h2>
      </div>

      <div className="space-y-4 font-mono text-sm">
        <InfoCard title="Height" value={props.height} />
        <InfoCard title="Hash" value={props.hash} />
        <InfoCard title="Parent Block Hash" value={props.parent_block_hash} />
        <InfoCard
          title="Block Time"
          value={new Date(props.burn_block_time_iso).toLocaleString()}
        />
        <InfoCard title="Canonical" value={props.canonical ? "Yes" : "No"} />
        <div className="bg-black bg-opacity-20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">
            Transactions ({props.txs.length})
          </h3>
          <ul className="space-y-2 mt-2">
            {props.txs.map((tx, index) => (
              <li key={index} className="truncate text-gray-400">
                {tx}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const InfoCard = ({ title, value }: { title: string; value: any }) => (
  <div className="bg-black bg-opacity-20 rounded-lg p-4">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-md font-semibold truncate">{value.toString()}</p>
  </div>
);
