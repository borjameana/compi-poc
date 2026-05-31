import { GetBitcoinHistory } from '../../src/bitcoin/application/get-bitcoin-history';
import { BitcoinPriceProvider } from '../../src/bitcoin/application/bitcoin-price.provider';
import { BitcoinPriceHistory } from '../../src/bitcoin/domain/value-objects/bitcoin-price-history';

const buildHistory = (): BitcoinPriceHistory => ({
    currency: 'usd',
    points: [
        { timestamp: 1700000000000, price: 35000 },
        { timestamp: 1700003600000, price: 35250 },
    ],
});

describe('GetBitcoinHistory', () => {
    it('returns bitcoin history when provider has data', async () => {
        const provider: BitcoinPriceProvider = {
            fetchLast24h: async () => buildHistory(),
        };

        const useCase = new GetBitcoinHistory(provider);
        const result = await useCase.call();

        expect(result.currency).toBe('usd');
        expect(result.points).toHaveLength(2);
    });
});
