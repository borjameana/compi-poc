import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateToyInput, ToysRepository, UpdateToyInput } from '../../application/toys.repository';
import { ToyEntity } from '../../domain/entities/toy.entity';

@Injectable()
export class InMemoryToysRepository implements ToysRepository {
    private toys: ToyEntity[] = [];

    constructor() {
        const now = new Date();
        this.toys = [
            new ToyEntity({
                id: randomUUID(),
                price: 29.99,
                brand: 'LEGO',
                model: 'City Fire Truck',
                color: 'Red',
                age: 7,
                createdAt: now,
                updatedAt: now,
            }),
            new ToyEntity({
                id: randomUUID(),
                price: 14.5,
                brand: 'Hasbro',
                model: 'Play-Doh Set',
                color: 'Multi',
                age: 3,
                createdAt: now,
                updatedAt: now,
            }),
            new ToyEntity({
                id: randomUUID(),
                price: 9.99,
                brand: 'Mattel',
                model: 'Hot Wheels',
                color: 'Blue',
                age: 6,
                createdAt: now,
                updatedAt: now,
            }),
        ];
    }

    async findAll(): Promise<ToyEntity[]> {
        return [...this.toys];
    }

    async findById(id: string): Promise<ToyEntity | null> {
        return this.toys.find((toy) => toy.id === id) || null;
    }

    async create(input: CreateToyInput): Promise<ToyEntity> {
        const now = new Date();
        const toy = new ToyEntity({
            id: randomUUID(),
            price: input.price,
            brand: input.brand,
            model: input.model,
            color: input.color,
            age: input.age,
            createdAt: now,
            updatedAt: now,
        });
        this.toys = [...this.toys, toy];
        return toy;
    }

    async update(id: string, input: UpdateToyInput): Promise<ToyEntity | null> {
        const index = this.toys.findIndex((toy) => toy.id === id);
        if (index === -1) {
            return null;
        }
        const current = this.toys[index];
        const updated = new ToyEntity({
            id: current.id,
            price: input.price ?? current.price,
            brand: input.brand ?? current.brand,
            model: input.model ?? current.model,
            color: input.color ?? current.color,
            age: input.age ?? current.age,
            createdAt: current.createdAt,
            updatedAt: new Date(),
        });
        this.toys[index] = updated;
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.toys.findIndex((toy) => toy.id === id);
        if (index === -1) {
            return false;
        }
        this.toys.splice(index, 1);
        return true;
    }
}
