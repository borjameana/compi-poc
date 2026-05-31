import { TaskEntity } from '../domain/entities/task.entity';
import { ListTasksFilters, TasksRepository } from './tasks.repository';
export declare class ListTasks {
    private readonly tasksRepository;
    private readonly logger;
    constructor(tasksRepository: TasksRepository);
    call(filters: ListTasksFilters): Promise<TaskEntity[]>;
}
