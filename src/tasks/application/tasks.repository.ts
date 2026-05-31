import { TaskEntity } from '../domain/entities/task.entity';
import { TaskPriority } from '../domain/value-objects/task-priority';
import { TaskStatus } from '../domain/value-objects/task-status';

export const TASKS_REPOSITORY = 'TASKS_REPOSITORY';

export type CreateTaskInput = {
    title: string;
    description?: string;
    priority?: TaskPriority;
};

export type ListTasksFilters = {
    status?: TaskStatus;
    priority?: TaskPriority;
};

export interface TasksRepository {
    create(input: CreateTaskInput): Promise<TaskEntity>;
    findAll(filters: ListTasksFilters): Promise<TaskEntity[]>;
    findById(id: string): Promise<TaskEntity | null>;
    updateStatus(id: string, status: TaskStatus): Promise<TaskEntity | null>;
    softDelete(id: string): Promise<boolean>;
}