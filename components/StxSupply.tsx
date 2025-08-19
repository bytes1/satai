"use client";

import { motion } from "framer-motion";
import { FaChartPie } from "react-icons/fa";

type StxSupplyProps = {
  stx_supply: string;
  unlocked_stx: string;
};

// Helper to format large numbers
const formatNumber = (numStr: string | number) => {
  const num = Number(numStr);
  if (isNaN(num)) {
    return "0";
  }
  return new Intl.NumberFormat("en-US").format(num);
};

export const StxSupply = (props: StxSupplyProps) => {
  return (
    <motion.div
      className="max-w-md mx-auto rounded-xl bg-gradient-to-br from-purple-800 via-purple-900 to-black shadow-2xl p-8 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      role="region"
      aria-label="STX Supply Information"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">STX Supply</h2>
        <FaChartPie className="text-3xl text-purple-400" />
      </div>
      <div className="space-y-4">
        <InfoCard
          title="Total STX Supply"
          value={formatNumber(props.stx_supply)}
        />
        <InfoCard
          title="Unlocked STX"
          value={formatNumber(props.unlocked_stx)}
        />
      </div>
    </motion.div>
  );
};

const InfoCard = ({ title, value }: { title: string; value: any }) => (
  <div className="bg-black bg-opacity-20 rounded-lg p-4">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-md font-semibold truncate">
      {value ? value.toString() : "N/A"}
    </p>
  </div>
);
