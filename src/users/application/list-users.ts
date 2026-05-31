import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from './users.repository';
import { UserEntity } from '../domain/entities/user.entity';

@Injectable()
export class ListUsers {
    constructor(
        @Inject(USERS_REPOSITORY)
        private readonly usersRepository: UsersRepository,
    ) { }

    async call(): Promise<UserEntity[]> {
        return this.usersRepository.findAll();
    }
}
