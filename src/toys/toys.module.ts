import { Module } from '@nestjs/common';
import { CreateToy } from './application/create-toy';
import { DeleteToy } from './application/delete-toy';
import { GetToy } from './application/get-toy';
import { ListToys } from './application/list-toys';
import { UpdateToy } from './application/update-toy';
import { TOYS_REPOSITORY } from './application/toys.repository';
import { ToysController } from './infrastructure/controllers/toys.controller';
import { InMemoryToysRepository } from './infrastructure/repositories/in-memory-toys.repository';

@Module({
    controllers: [ToysController],
    providers: [
        CreateToy,
        DeleteToy,
        GetToy,
        ListToys,
        UpdateToy,
        {
            provide: TOYS_REPOSITORY,
            useClass: InMemoryToysRepository,
        },
    ],
    exports: [CreateToy, DeleteToy, GetToy, ListToys, UpdateToy],
})
export class ToysModule { }
