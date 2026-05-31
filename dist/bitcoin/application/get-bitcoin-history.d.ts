import { BitcoinPriceProvider } from './bitcoin-price.provider';
import { BitcoinPriceHistory } from '../domain/value-objects/bitcoin-price-history';
export declare class GetBitcoinHistory {
    private readonly priceProvider;
    private readonly logger;
    constructor(priceProvider: BitcoinPriceProvider);
    call(): Promise<BitcoinPriceHistory>;
}
