import { Inject, Injectable, Logger } from '@nestjs/common';
import { CARS_REPOSITORY, CarsRepository, UpdateCarInput } from './cars.repository';
import { CarEntity } from '../domain/entities/car.entity';
import { CarNotFoundError } from '../domain/errors/car-not-found.error';

@Injectable()
export class UpdateCar {
    private readonly logger = new Logger(UpdateCar.name);

    constructor(
        @Inject(CARS_REPOSITORY)
        private readonly carsRepository: CarsRepository,
    ) { }

    async call(id: string, input: UpdateCarInput): Promise<CarEntity> {
        this.logger.log('Updating car', { id, input });
        const car = await this.carsRepository.update(id, input);
        if (!car) {
            this.logger.warn('Car not found', { id });
            throw new CarNotFoundError(id);
        }
        return car;
    }
}
