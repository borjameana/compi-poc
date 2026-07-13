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
        console.log("Hola compi!"); // Added "Hola compi!" log
        console.log("Entering getHistory method."); // Entry log

        try {
            const history = await this.getBitcoinHistory.call();
            const responseDto = BitcoinHistoryResponseDto.from(history);
            console.log("Exiting getHistory method with DTO:", responseDto); // Exit log with DTO
            return responseDto;
        } catch (error) {
            if (error instanceof BitcoinPriceUnavailableError) {
                console.error("Bitcoin price unavailable error:", error.message); // Log error
                throw new ServiceUnavailableException(error.message);
            }
            console.error("An unexpected error occurred:", error); // Log unexpected error
            throw error;
        }
    }
}
