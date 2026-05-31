import { TaskPriority } from '../../domain/value-objects/task-priority';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    priority?: TaskPriority;
}
