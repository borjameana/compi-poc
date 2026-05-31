import { CreateToyInput, ToysRepository } from './toys.repository';
import { ToyEntity } from '../domain/entities/toy.entity';
export declare class CreateToy {
    private readonly toysRepository;
    private readonly logger;
    constructor(toysRepository: ToysRepository);
    call(input: CreateToyInput): Promise<ToyEntity>;
}
