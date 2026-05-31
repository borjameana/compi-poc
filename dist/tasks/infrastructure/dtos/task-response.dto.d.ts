import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskPriority } from '../../domain/value-objects/task-priority';
import { TaskStatus } from '../../domain/value-objects/task-status';
export declare class TaskResponseDto {
    id: string;
    title: string;
    description: string | null;
    priority: TaskPriority;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    static from(task: TaskEntity): TaskResponseDto;
}
