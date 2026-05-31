import { UsersRepository, CreateUserInput, UpdateUserInput } from '../../application/users.repository';
import { UserEntity } from '../../domain/entities/user.entity';
export declare class InMemoryUsersRepository implements UsersRepository {
    private users;
    constructor();
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
    create(input: CreateUserInput): Promise<UserEntity>;
    update(id: string, input: UpdateUserInput): Promise<UserEntity | null>;
    delete(id: string): Promise<boolean>;
}
