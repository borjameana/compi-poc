import { TaskEntity } from '../domain/entities/task.entity';
import { CreateTaskInput, TasksRepository } from './tasks.repository';
export declare class CreateTask {
    private readonly tasksRepository;
    private readonly logger;
    constructor(tasksRepository: TasksRepository);
    call(input: CreateTaskInput): Promise<TaskEntity>;
}
