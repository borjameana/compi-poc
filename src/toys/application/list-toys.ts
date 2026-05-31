import { Inject, Injectable, Logger } from '@nestjs/common';
import { TOYS_REPOSITORY, ToysRepository } from './toys.repository';
import { ToyEntity } from '../domain/entities/toy.entity';

@Injectable()
export class ListToys {
    private readonly logger = new Logger(ListToys.name);

    constructor(
        @Inject(TOYS_REPOSITORY)
        private readonly toysRepository: ToysRepository,
    ) { }

    async call(): Promise<ToyEntity[]> {
        this.logger.log('Listing toys');
        return this.toysRepository.findAll();
    }
}
