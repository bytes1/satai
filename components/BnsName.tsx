"use client";

import { motion } from "framer-motion";
import { FaUserCheck } from "react-icons/fa";

type BnsNameProps = {
  address: string;
  blockchain: string;
  expire_block: number;
  last_txid: string;
  status: string;
  zonefile_hash: string;
};

export const BnsName = (props: BnsNameProps) => {
  return (
    <motion.div
      className="max-w-md mx-auto rounded-xl bg-gradient-to-br from-blue-800 via-blue-900 to-black shadow-2xl p-8 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      role="region"
      aria-label="BNS Name Information"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">
          BNS Name Details
        </h2>
        <FaUserCheck className="text-3xl text-blue-400" />
      </div>
      <div className="space-y-4">
        <InfoCard title="Address" value={props.address} />
        <InfoCard title="Blockchain" value={props.blockchain} />
        <InfoCard title="Status" value={props.status} />
        <InfoCard title="Expires at Block" value={props.expire_block} />
        <InfoCard title="Last Transaction" value={props.last_txid} />
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
