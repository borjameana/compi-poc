import { Injectable } from '@nestjs/common';

export type HealthStatus = {
    status: 'ok';
};

@Injectable()
export class CheckHealth {
    call(): HealthStatus {
        return { status: 'ok' };
    }
}
