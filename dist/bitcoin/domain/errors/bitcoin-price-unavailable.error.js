"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinPriceUnavailableError = void 0;
class BitcoinPriceUnavailableError extends Error {
    constructor(message) {
        super(message);
        this.code = 'BITCOIN_PRICE_UNAVAILABLE';
    }
}
exports.BitcoinPriceUnavailableError = BitcoinPriceUnavailableError;
//# sourceMappingURL=bitcoin-price-unavailable.error.js.map