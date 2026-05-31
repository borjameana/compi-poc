export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

const TASK_STATUS_TRANSITIONS: Readonly<Record<TaskStatus, ReadonlyArray<TaskStatus>>> = {
    [TaskStatus.TODO]: [TaskStatus.IN_PROGRESS],
    [TaskStatus.IN_PROGRESS]: [TaskStatus.DONE, TaskStatus.TODO],
    [TaskStatus.DONE]: [],
};

export function isValidTaskStatusTransition(from: TaskStatus, to: TaskStatus): boolean {
    return TASK_STATUS_TRANSITIONS[from].includes(to);
}