import { Controller, Get, HttpStatus, ServiceUnavailableException } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBitcoinHistory } from '../../application/get-bitcoin-history';
import { BitcoinPriceUnavailableError } from '../../domain/errors/bitcoin-price-unavailable.error';
import { BitcoinHistoryResponseDto } from '../dtos/bitcoin-history-response.dto';

@ApiTags('bitcoin')
@Controller('bitcoin')
export class BitcoinController {
    constructor(private readonly getBitcoinHistory: GetBitcoinHistory) { }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK' })
    @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Bitcoin price unavailable' })
    async getHistory(): Promise<BitcoinHistoryResponseDto> {
        try {
            const history = await this.getBitcoinHistory.call();
            return BitcoinHistoryResponseDto.from(history);
        } catch (error) {
            if (error instanceof BitcoinPriceUnavailableError) {
                throw new ServiceUnavailableException(error.message);
            }
            throw error;
        }
    }
}
