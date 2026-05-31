import { Inject, Injectable, Logger } from '@nestjs/common';
import { CARS_REPOSITORY, CarsRepository } from './cars.repository';
import { CarEntity } from '../domain/entities/car.entity';
import { CarNotFoundError } from '../domain/errors/car-not-found.error';

@Injectable()
export class GetCar {
    private readonly logger = new Logger(GetCar.name);

    constructor(
        @Inject(CARS_REPOSITORY)
        private readonly carsRepository: CarsRepository,
    ) { }

    async call(id: string): Promise<CarEntity> {
        this.logger.log('Fetching car', { id });
        const car = await this.carsRepository.findById(id);
        if (!car) {
            this.logger.warn('Car not found', { id });
            throw new CarNotFoundError(id);
        }
        return car;
    }
}
