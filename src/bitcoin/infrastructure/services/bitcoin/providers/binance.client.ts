import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BitcoinPriceProvider } from '../../../../application/bitcoin-price.provider';
import { BitcoinPriceHistory, BitcoinPricePoint } from '../../../../domain/value-objects/bitcoin-price-history';

type BinanceKlineResponse = [
    number,   // Open time
    string,   // Open price
    string,   // High price
    string,   // Low price
    string,   // Close price
    string,   // Volume
    number,   // Close time
    string,   // Quote asset volume
    number,   // Number of trades
    string,   // Taker buy base asset volume
    string,   // Taker buy quote asset volume
    string,   // Ignore
][];

@Injectable()
export class BinanceClient implements BitcoinPriceProvider {
    private readonly logger = new Logger(BinanceClient.name);
    private readonly baseUrl: string;
    private readonly timeoutMs: number;
    private readonly retries: number;

    constructor(private readonly configService: ConfigService) {
        this.baseUrl = this.configService.get<string>('BITCOIN_API_URL')
            || 'https://api.binance.com/api/v3';
        this.timeoutMs = Number(this.configService.get('BITCOIN_API_TIMEOUT_MS') || 4000);
        this.retries = Number(this.configService.get('BITCOIN_API_RETRIES') || 1);
    }

    async fetchLast24h(currency: string): Promise<BitcoinPriceHistory> {
        const symbol = `BTC${currency.toUpperCase()}`;
        const url = `${this.baseUrl}/klines?symbol=${symbol}&interval=1h&limit=24`;
        const data = await this.fetchWithRetry(url);
        const points: BitcoinPricePoint[] = data.map((kline) => ({
            timestamp: kline[0],
            price: Number.parseFloat(kline[4]),
        }));

        return {
            currency,
            points,
        };
    }

    private async fetchWithRetry(url: string): Promise<BinanceKlineResponse> {
        let lastError: Error | null = null;

        for (let attempt = 0; attempt <= this.retries; attempt += 1) {
            try {
                this.logger.log('Requesting Binance klines', { url, attempt });
                const response = await this.fetchWithTimeout(url, this.timeoutMs);

                if (!response.ok) {
                    const message = `Binance request failed with status ${response.status}`;
                    throw new Error(message);
                }

                return (await response.json()) as BinanceKlineResponse;
            } catch (error) {
                lastError = error instanceof Error ? error : new Error('Unknown error');
                this.logger.warn('Binance request failed', {
                    message: lastError.message,
                    attempt,
                });
            }
        }

        throw lastError ?? new Error('Binance request failed');
    }

    private async fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            return await fetch(url, {
                signal: controller.signal,
                headers: {
                    accept: 'application/json',
                },
            });
        } finally {
            clearTimeout(timeoutId);
        }
    }
}
