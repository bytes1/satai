"use client";

import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

type PoxInfoProps = {
  reward_cycle_id: number;
  total_liquid_stx: string;
  next_reward_cycle_in: string;
};

const formatNumber = (numStr: string | number) => {
  const num = Number(numStr);
  if (isNaN(num)) {
    return "0";
  }
  return new Intl.NumberFormat("en-US").format(num);
};

export const PoxInfo = (props: PoxInfoProps) => {
  return (
    <motion.div
      className="max-w-md mx-auto rounded-xl bg-gradient-to-br from-indigo-800 via-indigo-900 to-black shadow-2xl p-8 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="region"
      aria-label="PoX Information"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">
          PoX Information
        </h2>
        <FaInfoCircle className="text-3xl text-indigo-400" />
      </div>
      <div className="space-y-4">
        <InfoCard title="Reward Cycle ID" value={props.reward_cycle_id} />
        <InfoCard
          title="Total Liquid STX"
          value={formatNumber(props.total_liquid_stx)}
        />
        <InfoCard
          title="Next Reward Cycle In"
          value={props.next_reward_cycle_in}
        />
      </div>
    </motion.div>
  );
};

const InfoCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="bg-black bg-opacity-20 rounded-lg p-4">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-md font-semibold truncate">{value.toString()}</p>
  </div>
);
