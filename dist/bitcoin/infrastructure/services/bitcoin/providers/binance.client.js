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
var BinanceClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceClient = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let BinanceClient = BinanceClient_1 = class BinanceClient {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(BinanceClient_1.name);
        this.baseUrl = this.configService.get('BITCOIN_API_URL')
            || 'https://api.binance.com/api/v3';
        this.timeoutMs = Number(this.configService.get('BITCOIN_API_TIMEOUT_MS') || 4000);
        this.retries = Number(this.configService.get('BITCOIN_API_RETRIES') || 1);
    }
    async fetchLast24h(currency) {
        const symbol = `BTC${currency.toUpperCase()}`;
        const url = `${this.baseUrl}/klines?symbol=${symbol}&interval=1h&limit=24`;
        const data = await this.fetchWithRetry(url);
        const points = data.map((kline) => ({
            timestamp: kline[0],
            price: Number.parseFloat(kline[4]),
        }));
        return {
            currency,
            points,
        };
    }
    async fetchWithRetry(url) {
        let lastError = null;
        for (let attempt = 0; attempt <= this.retries; attempt += 1) {
            try {
                this.logger.log('Requesting Binance klines', { url, attempt });
                const response = await this.fetchWithTimeout(url, this.timeoutMs);
                if (!response.ok) {
                    const message = `Binance request failed with status ${response.status}`;
                    throw new Error(message);
                }
                return (await response.json());
            }
            catch (error) {
                lastError = error instanceof Error ? error : new Error('Unknown error');
                this.logger.warn('Binance request failed', {
                    message: lastError.message,
                    attempt,
                });
            }
        }
        throw lastError ?? new Error('Binance request failed');
    }
    async fetchWithTimeout(url, timeoutMs) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        try {
            return await fetch(url, {
                signal: controller.signal,
                headers: {
                    accept: 'application/json',
                },
            });
        }
        finally {
            clearTimeout(timeoutId);
        }
    }
};
exports.BinanceClient = BinanceClient;
exports.BinanceClient = BinanceClient = BinanceClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BinanceClient);
//# sourceMappingURL=binance.client.js.map