import { TasksRepository } from './tasks.repository';
export declare class DeleteTask {
    private readonly tasksRepository;
    private readonly logger;
    constructor(tasksRepository: TasksRepository);
    call(id: string): Promise<void>;
}
