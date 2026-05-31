import { ToysRepository } from './toys.repository';
import { ToyEntity } from '../domain/entities/toy.entity';
export declare class ListToys {
    private readonly toysRepository;
    private readonly logger;
    constructor(toysRepository: ToysRepository);
    call(): Promise<ToyEntity[]>;
}
