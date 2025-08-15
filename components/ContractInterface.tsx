"use client";

import { motion } from "framer-motion";
import { FaTerminal } from "react-icons/fa";

type ContractInterfaceProps = {
  functions: any[];
  variables: any[];
  maps: any[];
};

// Helper to render function arguments
const renderArgs = (args: any[]) => {
  if (args.length === 0) return "()";
  return `(${args.map((arg) => `${arg.name}: ${arg.type}`).join(", ")})`;
};

export const ContractInterface = (props: ContractInterfaceProps) => {
  const publicFns = props.functions.filter((f) => f.access === "public");
  const readOnlyFns = props.functions.filter((f) => f.access === "read_only");

  return (
    <motion.div
      className="max-w-2xl mx-auto rounded-xl bg-gray-900 border border-gray-700 shadow-2xl p-6 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <FaTerminal className="text-xl text-cyan-400" />
        <h2 className="text-xl font-bold">Contract Interface (ABI)</h2>
      </div>

      <div className="space-y-4 font-mono text-sm">
        {/* Public Functions */}
        <AbiSection
          title="Public Functions"
          items={publicFns}
          renderItem={(fn) => `${fn.name} ${renderArgs(fn.args)}`}
        />

        {/* Read-Only Functions */}
        <AbiSection
          title="Read-Only Functions"
          items={readOnlyFns}
          renderItem={(fn) => `${fn.name} ${renderArgs(fn.args)}`}
        />

        {/* Data Variables */}
        <AbiSection
          title="Data Variables"
          items={props.variables}
          renderItem={(v) => `${v.name}: ${v.type}`}
        />

        {/* Data Maps */}
        <AbiSection
          title="Data Maps"
          items={props.maps}
          renderItem={(m) => `${m.name}: (key: ${m.key}, value: ${m.value})`}
        />
      </div>
    </motion.div>
  );
};

// Sub-component for each section of the ABI
const AbiSection = ({
  title,
  items,
  renderItem,
}: {
  title: string;
  items: any[];
  renderItem: (item: any) => string;
}) => {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="font-bold text-cyan-400 mb-2">{title}</h3>
      <div className="bg-black/30 p-4 rounded-lg space-y-2">
        {items.map((item, index) => (
          <p key={index} className="text-gray-300">
            {renderItem(item)}
          </p>
        ))}
      </div>
    </div>
  );
};
