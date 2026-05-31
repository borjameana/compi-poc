import { Inject, Injectable, Logger } from '@nestjs/common';
import { CARS_REPOSITORY, CarsRepository, CreateCarInput } from './cars.repository';
import { CarEntity } from '../domain/entities/car.entity';

@Injectable()
export class CreateCar {
    private readonly logger = new Logger(CreateCar.name);

    constructor(
        @Inject(CARS_REPOSITORY)
        private readonly carsRepository: CarsRepository,
    ) { }

    async call(input: CreateCarInput): Promise<CarEntity> {
        this.logger.log('Creating car', {
            plate: input.plate,
            brand: input.brand,
            model: input.model,
            year: input.year,
        });
        return this.carsRepository.create(input);
    }
}
