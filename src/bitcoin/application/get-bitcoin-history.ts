import { Inject, Injectable, Logger } from '@nestjs/common';
import { BITCOIN_PRICE_PROVIDER, BitcoinPriceProvider } from './bitcoin-price.provider';
import { BitcoinPriceHistory } from '../domain/value-objects/bitcoin-price-history';
import { BitcoinPriceUnavailableError } from '../domain/errors/bitcoin-price-unavailable.error';

@Injectable()
export class GetBitcoinHistory {
    private readonly logger = new Logger(GetBitcoinHistory.name);

    constructor(
        @Inject(BITCOIN_PRICE_PROVIDER)
        private readonly priceProvider: BitcoinPriceProvider,
    ) { }

    async call(): Promise<BitcoinPriceHistory> {
        const startedAt = Date.now();

        try {
            this.logger.log('Fetching bitcoin history', { currency: 'usd' });
            const history = await this.priceProvider.fetchLast24h('usd');

            if (!history.points.length) {
                this.logger.warn('Bitcoin history returned no points', { currency: history.currency });
                throw new BitcoinPriceUnavailableError('Bitcoin history returned no data.');
            }

            this.logger.log('Bitcoin history fetched', {
                currency: history.currency,
                points: history.points.length,
                ms: Date.now() - startedAt,
            });

            return history;
        } catch (error) {
            if (error instanceof BitcoinPriceUnavailableError) {
                throw error;
            }

            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorStack = error instanceof Error ? error.stack : undefined;
            this.logger.error('Failed to fetch bitcoin history', {
                message: errorMessage,
                stack: errorStack,
                ms: Date.now() - startedAt,
            });

            throw new BitcoinPriceUnavailableError('Unable to fetch bitcoin history.');
        }
    }
}
