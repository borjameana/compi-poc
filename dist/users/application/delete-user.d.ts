import { UsersRepository } from './users.repository';
export declare class DeleteUser {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    call(id: string): Promise<void>;
}
