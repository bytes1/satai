import { cryptoToolPrice } from "./cryptoPrice";
import { Sendcrypto, Sendstx, Convertbtc } from "./cryptoTransactions";
import { getSbtcbalance } from "./cryptoBalances";
import { cryptoHistoricalPrice } from "./cryptoHistorical";
import { getTransactionAnalysis } from "./transactionHash";
import { getNftGallery } from "./nftGallery";
import { getMempoolData } from "./mempool";
import { getContractSource } from "./contractSource";
import { getRecentTransactions } from "./recentTransactions";
import { getTokenMetadata } from "./tokenMetadata";
import { getBnsName } from "./bnsName";
import { getContractInterface } from "./contractInterface";
import { getStxSupply } from "./stxSupply";
import { getBlockInfo } from "./blockInfo";

export const tools = {
  cryptoToolPrice,
  Sendcrypto,
  Convertbtc,
  Sendstx,
  getSbtcbalance,
  cryptoHistoricalPrice,
  getTransactionAnalysis,
  getNftGallery,
  getMempoolData,
  getContractSource,
  getRecentTransactions,
  getTokenMetadata,
  getBnsName,
  getContractInterface,
  getStxSupply,
  getBlockInfo,
};
