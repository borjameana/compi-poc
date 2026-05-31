import { ToysRepository } from './toys.repository';
import { ToyEntity } from '../domain/entities/toy.entity';
export declare class GetToy {
    private readonly toysRepository;
    private readonly logger;
    constructor(toysRepository: ToysRepository);
    call(id: string): Promise<ToyEntity>;
}
