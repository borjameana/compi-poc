export type BitcoinPricePoint = {
    timestamp: number;
    price: number;
};

export type BitcoinPriceHistory = {
    currency: string;
    points: BitcoinPricePoint[];
};
