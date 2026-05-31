import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from './users.repository';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';

@Injectable()
export class DeleteUser {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,
    ) { }

    async call(id: string): Promise<void> {
        const removed = await this.usersRepository.delete(id);
        if (!removed) {
            throw new UserNotFoundError(id);
        }
    }
}
