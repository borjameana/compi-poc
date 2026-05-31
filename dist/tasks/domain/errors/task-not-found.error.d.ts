export declare class TaskNotFoundError extends Error {
    readonly code = "TASK_NOT_FOUND";
    constructor(taskId: string);
}
