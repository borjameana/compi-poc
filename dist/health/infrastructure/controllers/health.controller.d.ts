import { CheckHealth } from '../../application/check-health';
import { HealthResponseDto } from '../dtos/health-response.dto';
export declare class HealthController {
    private readonly checkHealth;
    constructor(checkHealth: CheckHealth);
    isHealth(): Promise<HealthResponseDto>;
}
