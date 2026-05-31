import { TaskPriority } from '../../domain/value-objects/task-priority';
import { TaskStatus } from '../../domain/value-objects/task-status';
export declare class ListTasksQueryDto {
    status?: TaskStatus;
    priority?: TaskPriority;
}
