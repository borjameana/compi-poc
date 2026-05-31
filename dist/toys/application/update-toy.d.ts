import { ToysRepository, UpdateToyInput } from './toys.repository';
import { ToyEntity } from '../domain/entities/toy.entity';
export declare class UpdateToy {
    private readonly toysRepository;
    private readonly logger;
    constructor(toysRepository: ToysRepository);
    call(id: string, input: UpdateToyInput): Promise<ToyEntity>;
}
