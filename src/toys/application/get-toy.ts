import { Inject, Injectable, Logger } from '@nestjs/common';
import { TOYS_REPOSITORY, ToysRepository } from './toys.repository';
import { ToyEntity } from '../domain/entities/toy.entity';
import { ToyNotFoundError } from '../domain/errors/toy-not-found.error';

@Injectable()
export class GetToy {
    private readonly logger = new Logger(GetToy.name);

    constructor(
        @Inject(TOYS_REPOSITORY)
        private readonly toysRepository: ToysRepository,
    ) { }

    async call(id: string): Promise<ToyEntity> {
        this.logger.log('Fetching toy', { id });
        const toy = await this.toysRepository.findById(id);
        if (!toy) {
            this.logger.warn('Toy not found', { id });
            throw new ToyNotFoundError(id);
        }
        return toy;
    }
}
