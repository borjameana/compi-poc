import { TaskStatus } from '../value-objects/task-status';
export declare class InvalidTaskStatusTransitionError extends Error {
    readonly code = "INVALID_TASK_STATUS_TRANSITION";
    constructor(from: TaskStatus, to: TaskStatus);
}
