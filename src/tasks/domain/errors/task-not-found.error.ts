export class TaskNotFoundError extends Error {
    readonly code = 'TASK_NOT_FOUND';

    constructor(taskId: string) {
        super(`Task not found: ${taskId}`);
    }
}