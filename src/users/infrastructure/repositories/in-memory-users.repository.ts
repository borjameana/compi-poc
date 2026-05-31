import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { UsersRepository, CreateUserInput, UpdateUserInput } from '../../application/users.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
    private users: UserEntity[] = [];

    constructor() {
        const now = new Date();
        this.users = [
            new UserEntity({
                id: randomUUID(),
                name: 'Ana',
                surname: 'Ruiz',
                age: 32,
                country: 'ES',
                createdAt: now,
                updatedAt: now,
            }),
            new UserEntity({
                id: randomUUID(),
                name: 'Luis',
                surname: 'Martinez',
                age: 41,
                country: 'ES',
                createdAt: now,
                updatedAt: now,
            }),
            new UserEntity({
                id: randomUUID(),
                name: 'Marta',
                surname: 'Lopez',
                age: 27,
                country: 'PT',
                createdAt: now,
                updatedAt: now,
            }),
        ];
    }

    async findAll(): Promise<UserEntity[]> {
        return [...this.users];
    }

    async findById(id: string): Promise<UserEntity | null> {
        return this.users.find((user) => user.id === id) || null;
    }

    async create(input: CreateUserInput): Promise<UserEntity> {
        const now = new Date();
        const user = new UserEntity({
            id: randomUUID(),
            name: input.name,
            surname: input.surname,
            age: input.age,
            country: input.country,
            createdAt: now,
            updatedAt: now,
        });
        this.users = [...this.users, user];
        return user;
    }

    async update(id: string, input: UpdateUserInput): Promise<UserEntity | null> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return null;
        }
        const current = this.users[index];
        const updated = new UserEntity({
            id: current.id,
            name: input.name ?? current.name,
            surname: input.surname ?? current.surname,
            age: input.age ?? current.age,
            country: input.country ?? current.country,
            createdAt: current.createdAt,
            updatedAt: new Date(),
        });
        this.users[index] = updated;
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }
}
