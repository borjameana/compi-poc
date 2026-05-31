import { ToysRepository } from './toys.repository';
export declare class DeleteToy {
    private readonly toysRepository;
    private readonly logger;
    constructor(toysRepository: ToysRepository);
    call(id: string): Promise<void>;
}
