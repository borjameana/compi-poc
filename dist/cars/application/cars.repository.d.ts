import { CarEntity } from '../domain/entities/car.entity';
export type CreateCarInput = {
    plate: string;
    brand: string;
    model: string;
    year: number;
};
export type UpdateCarInput = {
    plate?: string;
    brand?: string;
    model?: string;
    year?: number;
};
export declare const CARS_REPOSITORY: unique symbol;
export interface CarsRepository {
    findAll(): Promise<CarEntity[]>;
    findById(id: string): Promise<CarEntity | null>;
    create(input: CreateCarInput): Promise<CarEntity>;
    update(id: string, input: UpdateCarInput): Promise<CarEntity | null>;
    delete(id: string): Promise<boolean>;
}
