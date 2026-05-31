import { UsersRepository, UpdateUserInput } from './users.repository';
import { UserEntity } from '../domain/entities/user.entity';
export declare class UpdateUser {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    call(id: string, input: UpdateUserInput): Promise<UserEntity>;
}
