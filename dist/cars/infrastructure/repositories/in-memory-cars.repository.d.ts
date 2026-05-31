import { CarsRepository, CreateCarInput, UpdateCarInput } from '../../application/cars.repository';
import { CarEntity } from '../../domain/entities/car.entity';
export declare class InMemoryCarsRepository implements CarsRepository {
    private cars;
    constructor();
    findAll(): Promise<CarEntity[]>;
    findById(id: string): Promise<CarEntity | null>;
    create(input: CreateCarInput): Promise<CarEntity>;
    update(id: string, input: UpdateCarInput): Promise<CarEntity | null>;
    delete(id: string): Promise<boolean>;
}
