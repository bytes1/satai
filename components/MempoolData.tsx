"use client";

import { motion } from "framer-motion";
import { FaLayerGroup } from "react-icons/fa";

type MempoolDataProps = {
  pending_txs: number;
  fee_rates: {
    low: number;
    medium: number;
    high: number;
  };
};

export const MempoolData = (props: MempoolDataProps) => {
  return (
    <motion.div
      className="max-w-md mx-auto rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl p-8 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      role="region"
      aria-label="Mempool Data"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Live Mempool Data
        </h2>
        <FaLayerGroup className="text-3xl text-blue-400" />
      </div>
      <div className="space-y-4">
        <InfoCard title="Pending Transactions" value={props.pending_txs} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard title="Low Fee" value={`${props.fee_rates.low} STX`} />
          <InfoCard
            title="Medium Fee"
            value={`${props.fee_rates.medium} STX`}
          />
          <InfoCard title="High Fee" value={`${props.fee_rates.high} STX`} />
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
