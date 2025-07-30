"use client";

import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaFileContract,
  FaExchangeAlt,
} from "react-icons/fa";

type TxAnalysisProps = {
  tx_id: string;
  tx_status: string;
  tx_type: string;
  sender_address: string;
  recipient_address?: string;
  block_height: number;
  block_time_iso: string;
  fee_rate: string;
  nonce: number;
  canonical: boolean;
  tx_result: string;
  events: any[];
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "success") {
    return <FaCheckCircle className="text-green-400" />;
  }
  if (status === "pending") {
    return <FaHourglassHalf className="text-yellow-400" />;
  }
  return <FaTimesCircle className="text-red-400" />;
};

export const TransactionAnalysis = (props: TxAnalysisProps) => {
  return (
    <motion.div
      className="max-w-2xl mx-auto rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl p-8 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      role="region"
      aria-label="Transaction Analysis"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Transaction Analysis
        </h2>
        <a
          href={`https://explorer.hiro.so/txid/${props.tx_id}?chain=testnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          View on Explorer
        </a>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-black bg-opacity-20 rounded-lg p-4">
          <span className="text-lg font-medium text-gray-400">Status</span>
          <div className="flex items-center space-x-2">
            <StatusIcon status={props.tx_status} />
            <span
              className={`text-lg font-bold ${
                props.tx_status === "success"
                  ? "text-green-400"
                  : props.tx_status === "pending"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {props.tx_status}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard title="Transaction Type" value={props.tx_type} />
          <InfoCard title="Block Height" value={props.block_height} />
          <InfoCard title="Sender" value={props.sender_address} />
          {props.recipient_address && (
            <InfoCard title="Recipient" value={props.recipient_address} />
          )}
          <InfoCard title="Fee Rate" value={`${props.fee_rate} STX`} />
          <InfoCard title="Nonce" value={props.nonce} />
          <InfoCard
            title="Block Time"
            value={new Date(props.block_time_iso).toLocaleString()}
          />
          <InfoCard title="Canonical" value={props.canonical ? "Yes" : "No"} />
        </div>
        <div className="bg-black bg-opacity-20 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            Transaction Result
          </h3>
          <p className="text-md font-semibold">{props.tx_result}</p>
        </div>
        <div className="bg-black bg-opacity-20 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-400 mb-2">Events</h3>
          <ul className="space-y-2">
            {props.events.map((event, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {event.event_type === "stx_asset" ? (
                    <FaExchangeAlt className="text-blue-400 mt-1" />
                  ) : (
                    <FaFileContract className="text-purple-400 mt-1" />
                  )}
                </div>
                <div>
                  <p className="text-md font-semibold">
                    {event.asset.asset_event_type}
                  </p>
                  <p className="text-sm text-gray-500">
                    From: {event.asset.sender}
                  </p>
                  <p className="text-sm text-gray-500">
                    To: {event.asset.recipient}
                  </p>
                  <p className="text-sm text-gray-500">
                    Amount: {event.asset.amount}
                  </p>
                </div>
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
