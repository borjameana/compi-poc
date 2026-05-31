import { HealthStatus } from '../../application/check-health';

export class HealthResponseDto {
    status!: 'ok';

    static from(input: HealthStatus): HealthResponseDto {
        return { status: input.status };
    }
}
