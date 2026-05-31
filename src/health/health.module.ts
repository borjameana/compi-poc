import { Module } from '@nestjs/common';
import { CheckHealth } from './application/check-health';
import { HealthController } from './infrastructure/controllers/health.controller';

@Module({
    controllers: [HealthController],
    providers: [CheckHealth],
    exports: [CheckHealth],
})
export class HealthModule { }
