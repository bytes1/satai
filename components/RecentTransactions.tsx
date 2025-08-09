"use client";

import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa";

interface RecentTransaction {
  tx_id: string;
  tx_status: string;
  tx_type: string;
  sender_address: string;
  block_height: number;
  block_time_iso: string;
  fee_rate: string;
  nonce: number;
}

interface RecentTransactionsProps {
  transactions: RecentTransaction[];
}

export const RecentTransactions = ({
  transactions,
}: RecentTransactionsProps) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl p-8 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Recent Transactions
        </h2>
        <FaHistory className="text-3xl text-blue-400" />
      </div>
      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.tx_id}
            className="flex items-center justify-between bg-black bg-opacity-20 rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <div>
              <p className="text-sm text-gray-400 truncate">{tx.tx_id}</p>
              <p className="font-semibold">{tx.tx_type}</p>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${
                  tx.tx_status === "success"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {tx.tx_status}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(tx.block_time_iso).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
