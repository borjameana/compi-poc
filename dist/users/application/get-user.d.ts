import { UsersRepository } from './users.repository';
import { UserEntity } from '../domain/entities/user.entity';
export declare class GetUser {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    call(id: string): Promise<UserEntity>;
}
