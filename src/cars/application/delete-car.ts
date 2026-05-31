import { Inject, Injectable, Logger } from '@nestjs/common';
import { CARS_REPOSITORY, CarsRepository } from './cars.repository';
import { CarNotFoundError } from '../domain/errors/car-not-found.error';

@Injectable()
export class DeleteCar {
    private readonly logger = new Logger(DeleteCar.name);

    constructor(
        @Inject(CARS_REPOSITORY)
        private readonly carsRepository: CarsRepository,
    ) { }

    async call(id: string): Promise<void> {
        this.logger.log('Deleting car', { id });
        const removed = await this.carsRepository.delete(id);
        if (!removed) {
            this.logger.warn('Car not found', { id });
            throw new CarNotFoundError(id);
        }
    }
}
