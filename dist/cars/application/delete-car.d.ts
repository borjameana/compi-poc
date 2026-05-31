import { CarsRepository } from './cars.repository';
export declare class DeleteCar {
    private readonly carsRepository;
    private readonly logger;
    constructor(carsRepository: CarsRepository);
    call(id: string): Promise<void>;
}
