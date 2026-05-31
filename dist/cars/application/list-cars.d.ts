import { CarsRepository } from './cars.repository';
import { CarEntity } from '../domain/entities/car.entity';
export declare class ListCars {
    private readonly carsRepository;
    private readonly logger;
    constructor(carsRepository: CarsRepository);
    call(): Promise<CarEntity[]>;
}
