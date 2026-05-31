import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CarsRepository, CreateCarInput, UpdateCarInput } from '../../application/cars.repository';
import { CarEntity } from '../../domain/entities/car.entity';

@Injectable()
export class InMemoryCarsRepository implements CarsRepository {
    private cars: CarEntity[] = [];

    constructor() {
        const now = new Date();
        this.cars = [
            new CarEntity({
                id: randomUUID(),
                plate: '1234-ABC',
                brand: 'Toyota',
                model: 'Corolla',
                year: 2020,
                createdAt: now,
                updatedAt: now,
            }),
            new CarEntity({
                id: randomUUID(),
                plate: '5678-DEF',
                brand: 'Seat',
                model: 'Leon',
                year: 2019,
                createdAt: now,
                updatedAt: now,
            }),
            new CarEntity({
                id: randomUUID(),
                plate: '9012-GHI',
                brand: 'Tesla',
                model: 'Model 3',
                year: 2022,
                createdAt: now,
                updatedAt: now,
            }),
        ];
    }

    async findAll(): Promise<CarEntity[]> {
        return [...this.cars];
    }

    async findById(id: string): Promise<CarEntity | null> {
        return this.cars.find((car) => car.id === id) || null;
    }

    async create(input: CreateCarInput): Promise<CarEntity> {
        const now = new Date();
        const car = new CarEntity({
            id: randomUUID(),
            plate: input.plate,
            brand: input.brand,
            model: input.model,
            year: input.year,
            createdAt: now,
            updatedAt: now,
        });
        this.cars = [...this.cars, car];
        return car;
    }

    async update(id: string, input: UpdateCarInput): Promise<CarEntity | null> {
        const index = this.cars.findIndex((car) => car.id === id);
        if (index === -1) {
            return null;
        }
        const current = this.cars[index];
        const updated = new CarEntity({
            id: current.id,
            plate: input.plate ?? current.plate,
            brand: input.brand ?? current.brand,
            model: input.model ?? current.model,
            year: input.year ?? current.year,
            createdAt: current.createdAt,
            updatedAt: new Date(),
        });
        this.cars[index] = updated;
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.cars.findIndex((car) => car.id === id);
        if (index === -1) {
            return false;
        }
        this.cars.splice(index, 1);
        return true;
    }
}
