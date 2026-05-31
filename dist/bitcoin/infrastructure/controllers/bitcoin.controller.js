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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_bitcoin_history_1 = require("../../application/get-bitcoin-history");
const bitcoin_price_unavailable_error_1 = require("../../domain/errors/bitcoin-price-unavailable.error");
const bitcoin_history_response_dto_1 = require("../dtos/bitcoin-history-response.dto");
let BitcoinController = class BitcoinController {
    constructor(getBitcoinHistory) {
        this.getBitcoinHistory = getBitcoinHistory;
    }
    async getHistory() {
        try {
            const history = await this.getBitcoinHistory.call();
            return bitcoin_history_response_dto_1.BitcoinHistoryResponseDto.from(history);
        }
        catch (error) {
            if (error instanceof bitcoin_price_unavailable_error_1.BitcoinPriceUnavailableError) {
                throw new common_1.ServiceUnavailableException(error.message);
            }
            throw error;
        }
    }
};
exports.BitcoinController = BitcoinController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.SERVICE_UNAVAILABLE, description: 'Bitcoin price unavailable' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BitcoinController.prototype, "getHistory", null);
exports.BitcoinController = BitcoinController = __decorate([
    (0, swagger_1.ApiTags)('bitcoin'),
    (0, common_1.Controller)('bitcoin'),
    __metadata("design:paramtypes", [get_bitcoin_history_1.GetBitcoinHistory])
], BitcoinController);
//# sourceMappingURL=bitcoin.controller.js.map