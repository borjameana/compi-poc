import { HealthStatus } from '../../application/check-health';
export declare class HealthResponseDto {
    status: 'ok';
    static from(input: HealthStatus): HealthResponseDto;
}
