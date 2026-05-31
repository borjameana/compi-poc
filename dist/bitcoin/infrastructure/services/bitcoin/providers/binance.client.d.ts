import { ConfigService } from '@nestjs/config';
import { BitcoinPriceProvider } from '../../../../application/bitcoin-price.provider';
import { BitcoinPriceHistory } from '../../../../domain/value-objects/bitcoin-price-history';
export declare class BinanceClient implements BitcoinPriceProvider {
    private readonly configService;
    private readonly logger;
    private readonly baseUrl;
    private readonly timeoutMs;
    private readonly retries;
    constructor(configService: ConfigService);
    fetchLast24h(currency: string): Promise<BitcoinPriceHistory>;
    private fetchWithRetry;
    private fetchWithTimeout;
}
