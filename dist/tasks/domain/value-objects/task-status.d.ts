export declare enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare function isValidTaskStatusTransition(from: TaskStatus, to: TaskStatus): boolean;
