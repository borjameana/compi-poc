"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinModule = void 0;
const common_1 = require("@nestjs/common");
const get_bitcoin_history_1 = require("./application/get-bitcoin-history");
const bitcoin_price_provider_1 = require("./application/bitcoin-price.provider");
const bitcoin_controller_1 = require("./infrastructure/controllers/bitcoin.controller");
const binance_client_1 = require("./infrastructure/services/bitcoin/providers/binance.client");
let BitcoinModule = class BitcoinModule {
};
exports.BitcoinModule = BitcoinModule;
exports.BitcoinModule = BitcoinModule = __decorate([
    (0, common_1.Module)({
        controllers: [bitcoin_controller_1.BitcoinController],
        providers: [
            get_bitcoin_history_1.GetBitcoinHistory,
            {
                provide: bitcoin_price_provider_1.BITCOIN_PRICE_PROVIDER,
                useClass: binance_client_1.BinanceClient,
            },
        ],
        exports: [get_bitcoin_history_1.GetBitcoinHistory],
    })
], BitcoinModule);
//# sourceMappingURL=bitcoin.module.js.map