import { CarsRepository } from './cars.repository';
import { CarEntity } from '../domain/entities/car.entity';
export declare class GetCar {
    private readonly carsRepository;
    private readonly logger;
    constructor(carsRepository: CarsRepository);
    call(id: string): Promise<CarEntity>;
}
