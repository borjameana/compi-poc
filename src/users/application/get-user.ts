import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from './users.repository';
import { UserEntity } from '../domain/entities/user.entity';
import { UserNotFoundError } from '../domain/errors/user-not-found.error';

@Injectable()
export class GetUser {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,
    ) { }

    async call(id: string): Promise<UserEntity> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new UserNotFoundError(id);
        }
        return user;
    }
}
