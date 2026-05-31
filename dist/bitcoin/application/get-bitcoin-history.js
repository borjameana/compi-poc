"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GetBitcoinHistory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBitcoinHistory = void 0;
const common_1 = require("@nestjs/common");
const bitcoin_price_provider_1 = require("./bitcoin-price.provider");
const bitcoin_price_unavailable_error_1 = require("../domain/errors/bitcoin-price-unavailable.error");
let GetBitcoinHistory = GetBitcoinHistory_1 = class GetBitcoinHistory {
    constructor(priceProvider) {
        this.priceProvider = priceProvider;
        this.logger = new common_1.Logger(GetBitcoinHistory_1.name);
    }
    async call() {
        const startedAt = Date.now();
        try {
            this.logger.log('Fetching bitcoin history', { currency: 'usd' });
            const history = await this.priceProvider.fetchLast24h('usd');
            if (!history.points.length) {
                this.logger.warn('Bitcoin history returned no points', { currency: history.currency });
                throw new bitcoin_price_unavailable_error_1.BitcoinPriceUnavailableError('Bitcoin history returned no data.');
            }
            this.logger.log('Bitcoin history fetched', {
                currency: history.currency,
                points: history.points.length,
                ms: Date.now() - startedAt,
            });
            return history;
        }
        catch (error) {
            if (error instanceof bitcoin_price_unavailable_error_1.BitcoinPriceUnavailableError) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorStack = error instanceof Error ? error.stack : undefined;
            this.logger.error('Failed to fetch bitcoin history', {
                message: errorMessage,
                stack: errorStack,
                ms: Date.now() - startedAt,
            });
            throw new bitcoin_price_unavailable_error_1.BitcoinPriceUnavailableError('Unable to fetch bitcoin history.');
        }
    }
};
exports.GetBitcoinHistory = GetBitcoinHistory;
exports.GetBitcoinHistory = GetBitcoinHistory = GetBitcoinHistory_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(bitcoin_price_provider_1.BITCOIN_PRICE_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], GetBitcoinHistory);
//# sourceMappingURL=get-bitcoin-history.js.map