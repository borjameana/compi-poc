import { BitcoinPriceHistory } from '../domain/value-objects/bitcoin-price-history';
export declare const BITCOIN_PRICE_PROVIDER: unique symbol;
export interface BitcoinPriceProvider {
    fetchLast24h(currency: string): Promise<BitcoinPriceHistory>;
}
