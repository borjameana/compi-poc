import { Inject, Injectable, Logger } from '@nestjs/common';
import { CARS_REPOSITORY, CarsRepository } from './cars.repository';
import { CarEntity } from '../domain/entities/car.entity';

@Injectable()
export class ListCars {
    private readonly logger = new Logger(ListCars.name);

    constructor(
        @Inject(CARS_REPOSITORY)
        private readonly carsRepository: CarsRepository,
    ) { }

    async call(): Promise<CarEntity[]> {
        this.logger.log('Listing cars');
        return this.carsRepository.findAll();
    }
}
