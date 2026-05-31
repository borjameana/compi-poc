import { BitcoinPriceHistory } from '../domain/value-objects/bitcoin-price-history';

export const BITCOIN_PRICE_PROVIDER = Symbol('BITCOIN_PRICE_PROVIDER');

export interface BitcoinPriceProvider {
    fetchLast24h(currency: string): Promise<BitcoinPriceHistory>;
}
