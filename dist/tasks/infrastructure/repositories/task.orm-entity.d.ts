import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskPriority } from '../../domain/value-objects/task-priority';
import { TaskStatus } from '../../domain/value-objects/task-status';
export declare class TaskOrmEntity {
    id: string;
    title: string;
    description: string | null;
    priority: TaskPriority;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    toDomain(): TaskEntity;
    static fromDomain(task: TaskEntity): TaskOrmEntity;
}
