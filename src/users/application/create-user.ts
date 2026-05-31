import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository, CreateUserInput } from './users.repository';
import { UserEntity } from '../domain/entities/user.entity';

@Injectable()
export class CreateUser {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,
    ) { }

    async call(input: CreateUserInput): Promise<UserEntity> {
        return this.usersRepository.create(input);
    }
}
