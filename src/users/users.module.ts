import { Module } from '@nestjs/common';
import { CreateUser } from './application/create-user';
import { DeleteUser } from './application/delete-user';
import { GetUser } from './application/get-user';
import { ListUsers } from './application/list-users';
import { UpdateUser } from './application/update-user';
import { USERS_REPOSITORY } from './application/users.repository';
import { UsersController } from './infrastructure/controllers/users.controller';
import { InMemoryUsersRepository } from './infrastructure/repositories/in-memory-users.repository';

@Module({
    controllers: [UsersController],
    providers: [
        CreateUser,
        DeleteUser,
        GetUser,
        ListUsers,
        UpdateUser,
        {
            provide: USERS_REPOSITORY,
            useClass: InMemoryUsersRepository,
        },
    ],
    exports: [CreateUser, DeleteUser, GetUser, ListUsers, UpdateUser],
})
export class UsersModule { }
