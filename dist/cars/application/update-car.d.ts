import { CarsRepository, UpdateCarInput } from './cars.repository';
import { CarEntity } from '../domain/entities/car.entity';
export declare class UpdateCar {
    private readonly carsRepository;
    private readonly logger;
    constructor(carsRepository: CarsRepository);
    call(id: string, input: UpdateCarInput): Promise<CarEntity>;
}
