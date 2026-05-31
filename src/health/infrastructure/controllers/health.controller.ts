import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckHealth } from '../../application/check-health';
import { HealthResponseDto } from '../dtos/health-response.dto';

@ApiTags('health')
@Controller()
export class HealthController {
    constructor(private readonly checkHealth: CheckHealth) { }

    @Get(['health', '/'])
    @ApiOperation({ summary: 'Lets you test the health of an API instance.' })
    @ApiOkResponse({ status: HttpStatus.OK })
    async isHealth(): Promise<HealthResponseDto> {
        const status = this.checkHealth.call();
        return HealthResponseDto.from(status);
    }
}
