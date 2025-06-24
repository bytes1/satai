"use client";

type Sbtcbalance = {
  balance: number;
};

export const Sbtcbalance = ({ balance }: Sbtcbalance) => {
  return (
    <div className="max-w-sm rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold mb-4">Crypto Information</h2>
      <div className="space-y-3">
        <p className="text-lg font-semibold">
          <span className="text-gray-200">Sbtc balance:</span>{" "}
          <span className="text-green-400">${balance}</span>
        </p>
      </div>
    </div>
  );
};
