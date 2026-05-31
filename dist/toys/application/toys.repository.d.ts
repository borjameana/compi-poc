import { ToyEntity } from '../domain/entities/toy.entity';
export type CreateToyInput = {
    price: number;
    brand: string;
    model: string;
    color: string;
    age: number;
};
export type UpdateToyInput = {
    price?: number;
    brand?: string;
    model?: string;
    color?: string;
    age?: number;
};
export declare const TOYS_REPOSITORY: unique symbol;
export interface ToysRepository {
    findAll(): Promise<ToyEntity[]>;
    findById(id: string): Promise<ToyEntity | null>;
    create(input: CreateToyInput): Promise<ToyEntity>;
    update(id: string, input: UpdateToyInput): Promise<ToyEntity | null>;
    delete(id: string): Promise<boolean>;
}
