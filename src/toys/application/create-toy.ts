import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateToyInput, TOYS_REPOSITORY, ToysRepository } from './toys.repository';
import { ToyEntity } from '../domain/entities/toy.entity';

@Injectable()
export class CreateToy {
    private readonly logger = new Logger(CreateToy.name);

    constructor(
        @Inject(TOYS_REPOSITORY)
        private readonly toysRepository: ToysRepository,
    ) { }

    async call(input: CreateToyInput): Promise<ToyEntity> {
        this.logger.log('Creating toy', {
            brand: input.brand,
            model: input.model,
            color: input.color,
            price: input.price,
            age: input.age,
        });
        return this.toysRepository.create(input);
    }
}
