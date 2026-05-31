import { UserEntity } from '../domain/entities/user.entity';

export type CreateUserInput = {
    name: string;
    surname: string;
    age: number;
    country: string;
};

export type UpdateUserInput = {
    name?: string;
    surname?: string;
    age?: number;
    country?: string;
};

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface UsersRepository {
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
    create(input: CreateUserInput): Promise<UserEntity>;
    update(id: string, input: UpdateUserInput): Promise<UserEntity | null>;
    delete(id: string): Promise<boolean>;
}
