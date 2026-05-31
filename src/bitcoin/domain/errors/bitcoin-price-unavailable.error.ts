export class BitcoinPriceUnavailableError extends Error {
    readonly code = 'BITCOIN_PRICE_UNAVAILABLE';

    constructor(message: string) {
        super(message);
    }
}
