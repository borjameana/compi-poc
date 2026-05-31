import { Inject, Injectable, Logger } from '@nestjs/common';
import { TOYS_REPOSITORY, ToysRepository } from './toys.repository';
import { ToyNotFoundError } from '../domain/errors/toy-not-found.error';

@Injectable()
export class DeleteToy {
    private readonly logger = new Logger(DeleteToy.name);

    constructor(
        @Inject(TOYS_REPOSITORY)
        private readonly toysRepository: ToysRepository,
    ) { }

    async call(id: string): Promise<void> {
        this.logger.log('Deleting toy', { id });
        const removed = await this.toysRepository.delete(id);
        if (!removed) {
            this.logger.warn('Toy not found', { id });
            throw new ToyNotFoundError(id);
        }
    }
}
