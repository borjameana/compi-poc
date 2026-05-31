import { TaskEntity } from '../domain/entities/task.entity';
import { TaskStatus } from '../domain/value-objects/task-status';
import { TasksRepository } from './tasks.repository';
export declare class UpdateTaskStatus {
    private readonly tasksRepository;
    private readonly logger;
    constructor(tasksRepository: TasksRepository);
    call(id: string, status: TaskStatus): Promise<TaskEntity>;
}
