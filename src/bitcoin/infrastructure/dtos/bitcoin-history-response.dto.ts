import { BitcoinPriceHistory } from '../../domain/value-objects/bitcoin-price-history';

export class BitcoinHistoryPointDto {
    timestamp!: number;
    price!: number;
}

export class BitcoinHistoryResponseDto {
    currency!: string;
    points!: BitcoinHistoryPointDto[];

    static from(history: BitcoinPriceHistory): BitcoinHistoryResponseDto {
        return {
            currency: history.currency,
            points: history.points.map((point) => ({
                timestamp: point.timestamp,
                price: point.price,
            })),
        };
    }
}
