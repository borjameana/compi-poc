import { Module } from '@nestjs/common';
import { GetBitcoinHistory } from './application/get-bitcoin-history';
import { BITCOIN_PRICE_PROVIDER } from './application/bitcoin-price.provider';
import { BitcoinController } from './infrastructure/controllers/bitcoin.controller';
import { BinanceClient } from './infrastructure/services/bitcoin/providers/binance.client';

@Module({
    controllers: [BitcoinController],
    providers: [
        GetBitcoinHistory,
        {
            provide: BITCOIN_PRICE_PROVIDER,
            useClass: BinanceClient,
        },
    ],
    exports: [GetBitcoinHistory],
})
export class BitcoinModule { }
