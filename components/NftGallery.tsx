"use client";

import { motion } from "framer-motion";

interface NftAsset {
  id: string;
  number: number;
  address: string;
  mime_type: string;
  content_type: string;
  content_length: number;
  genesis_transaction: string;
  location: string;
  output: string;
  value: string;
  offset: string;
  timestamp: string;
}

type NftGalleryProps = {
  nfts: NftAsset[];
};

export const NftGallery = ({ nfts }: NftGalleryProps) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold tracking-tight mb-6">
        Your NFT Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nfts.map((nft, index) => (
          <motion.div
            key={nft.id}
            className="rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl p-4 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <img
              src={`https://api.hiro.so/ordinals/v1/inscriptions/${nft.id}/content`}
              alt={`NFT #${nft.number}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="text-center">
              <h3 className="text-lg font-bold">Inscription #{nft.number}</h3>
              <p className="text-sm text-gray-400 truncate">{nft.address}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
