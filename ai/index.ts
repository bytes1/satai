import { cryptoToolPrice } from "./cryptoPrice";
import { Sendcrypto, Sendstx, Convertbtc } from "./cryptoTransactions";
import { getSbtcbalance } from "./cryptoBalances";
import { cryptoHistoricalPrice } from "./cryptoHistorical";

export const tools = {
  cryptoToolPrice,
  Sendcrypto,
  Convertbtc,
  Sendstx,
  getSbtcbalance,
  cryptoHistoricalPrice,
};
