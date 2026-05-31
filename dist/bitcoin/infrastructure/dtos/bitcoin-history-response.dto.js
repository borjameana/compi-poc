"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinHistoryResponseDto = exports.BitcoinHistoryPointDto = void 0;
class BitcoinHistoryPointDto {
}
exports.BitcoinHistoryPointDto = BitcoinHistoryPointDto;
class BitcoinHistoryResponseDto {
    static from(history) {
        return {
            currency: history.currency,
            points: history.points.map((point) => ({
                timestamp: point.timestamp,
                price: point.price,
            })),
        };
    }
}
exports.BitcoinHistoryResponseDto = BitcoinHistoryResponseDto;
//# sourceMappingURL=bitcoin-history-response.dto.js.map