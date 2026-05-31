import { UsersRepository } from './users.repository';
import { UserEntity } from '../domain/entities/user.entity';
export declare class ListUsers {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    call(): Promise<UserEntity[]>;
}
