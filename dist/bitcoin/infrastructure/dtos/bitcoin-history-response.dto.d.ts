import { BitcoinPriceHistory } from '../../domain/value-objects/bitcoin-price-history';
export declare class BitcoinHistoryPointDto {
    timestamp: number;
    price: number;
}
export declare class BitcoinHistoryResponseDto {
    currency: string;
    points: BitcoinHistoryPointDto[];
    static from(history: BitcoinPriceHistory): BitcoinHistoryResponseDto;
}
