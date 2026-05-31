import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository, UpdateUserInput } from './users.repository';
import { UserEntity } from '../domain/entities/user.entity';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';

@Injectable()
export class UpdateUser {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,
    ) { }

    async call(id: string, input: UpdateUserInput): Promise<UserEntity> {
        const user = await this.usersRepository.update(id, input);
        if (!user) {
            throw new UserNotFoundError(id);
        }
        return user;
    }
}
