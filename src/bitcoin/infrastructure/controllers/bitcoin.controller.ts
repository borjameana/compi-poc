import { Controller, Get, HttpStatus, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBitcoinHistory } from '../../application/get-bitcoin-history';
import { BitcoinPriceUnavailableError } from '../../domain/errors/bitcoin-price-unavailable.error';
import { BitcoinHistoryResponseDto } from '../dtos/bitcoin-history-response.dto';

@ApiTags('bitcoin')
@Controller('bitcoin')
export class BitcoinController {
    private readonly logger = new Logger(BitcoinController.name);
    constructor(private readonly getBitcoinHistory: GetBitcoinHistory) { }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Bitcoin price unavailable' })
    async getHistory(): Promise<BitcoinHistoryResponseDto> {
        this.logger.log({ operation: 'getHistory' });
        try {
            const history = await this.getBitcoinHistory.call();
            if (history.prices.length === 0) {
                this.logger.warn({ operation: 'getHistory', message: 'No bitcoin history found', status: 'empty' });
            }
            this.logger.log({ operation: 'getHistory', status: 'completed', count: history.prices.length });
            return BitcoinHistoryResponseDto.from(history);
        } catch (error) {
            if (error instanceof BitcoinPriceUnavailableError) {
                this.logger.warn({ operation: 'getHistory', message: error.message, error: error.name });
                throw new ServiceUnavailableException(error.message);
            }
            throw error;
        }
    }
}
