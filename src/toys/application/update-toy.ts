import { Inject, Injectable, Logger } from '@nestjs/common';
import { TOYS_REPOSITORY, ToysRepository, UpdateToyInput } from './toys.repository';
import { ToyEntity } from '../domain/entities/toy.entity';
import { ToyNotFoundError } from '../domain/errors/toy-not-found.error';

@Injectable()
export class UpdateToy {
    private readonly logger = new Logger(UpdateToy.name);

    constructor(
        @Inject(TOYS_REPOSITORY)
        private readonly toysRepository: ToysRepository,
    ) { }

    async call(id: string, input: UpdateToyInput): Promise<ToyEntity> {
        this.logger.log('Updating toy', { id, input });
        const toy = await this.toysRepository.update(id, input);
        if (!toy) {
            this.logger.warn('Toy not found', { id });
            throw new ToyNotFoundError(id);
        }
        return toy;
    }
}
