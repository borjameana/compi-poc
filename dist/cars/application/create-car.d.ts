import { CarsRepository, CreateCarInput } from './cars.repository';
import { CarEntity } from '../domain/entities/car.entity';
export declare class CreateCar {
    private readonly carsRepository;
    private readonly logger;
    constructor(carsRepository: CarsRepository);
    call(input: CreateCarInput): Promise<CarEntity>;
}
