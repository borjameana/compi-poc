import { CreateToyInput, ToysRepository, UpdateToyInput } from '../../application/toys.repository';
import { ToyEntity } from '../../domain/entities/toy.entity';
export declare class InMemoryToysRepository implements ToysRepository {
    private toys;
    constructor();
    findAll(): Promise<ToyEntity[]>;
    findById(id: string): Promise<ToyEntity | null>;
    create(input: CreateToyInput): Promise<ToyEntity>;
    update(id: string, input: UpdateToyInput): Promise<ToyEntity | null>;
    delete(id: string): Promise<boolean>;
}
