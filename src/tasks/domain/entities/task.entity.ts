import { TaskPriority } from '../value-objects/task-priority';
import { TaskStatus } from '../value-objects/task-status';

export type TaskEntityProps = {
    id: string;
    title: string;
    description: string | null;
    priority: TaskPriority;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export class TaskEntity {
    readonly id: string;
    readonly title: string;
    readonly description: string | null;
    readonly priority: TaskPriority;
    readonly status: TaskStatus;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date | null;

    constructor(props: TaskEntityProps) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.priority = props.priority;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }
}