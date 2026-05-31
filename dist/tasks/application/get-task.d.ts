import { TaskEntity } from '../domain/entities/task.entity';
import { TasksRepository } from './tasks.repository';
export declare class GetTask {
    private readonly tasksRepository;
    private readonly logger;
    constructor(tasksRepository: TasksRepository);
    call(id: string): Promise<TaskEntity>;
}
