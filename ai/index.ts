import { cryptoToolPrice } from "./cryptoPrice";
import { Sendcrypto, Sendstx, Convertbtc } from "./cryptoTransactions";
import { getSbtcbalance } from "./cryptoBalances";
import { cryptoHistoricalPrice } from "./cryptoHistorical";
import { getTransactionAnalysis } from "./transactionHash";
import { getNftGallery } from "./nftGallery";
import { getMempoolData } from "./mempool";
import { getContractSource } from "./contractSource";

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
};
