import { UsersRepository, CreateUserInput } from './users.repository';
import { UserEntity } from '../domain/entities/user.entity';
export declare class CreateUser {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    call(input: CreateUserInput): Promise<UserEntity>;
}
