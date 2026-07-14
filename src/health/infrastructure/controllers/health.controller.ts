import { Controller, Get, HttpStatus, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckHealth } from '../../application/check-health';
import { HealthResponseDto } from '../dtos/health-response.dto';

@ApiTags('health')
@Controller()
export class HealthController {
    private readonly logger = new Logger(HealthController.name);
    constructor(private readonly checkHealth: CheckHealth) { }

    @Get(['health', '/'])
    @ApiOperation({ summary: 'Lets you test the health of an API instance.' })
    @ApiOkResponse({ status: HttpStatus.OK })
    async isHealth(): Promise<HealthResponseDto> {
        this.logger.log({ operation: 'isHealth' });
        const status = this.checkHealth.call();
        this.logger.log({ operation: 'isHealth', status: 'completed', healthStatus: status.status });
        return HealthResponseDto.from(status);
    }
}
