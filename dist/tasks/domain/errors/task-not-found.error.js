"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskNotFoundError = void 0;
class TaskNotFoundError extends Error {
    constructor(taskId) {
        super(`Task not found: ${taskId}`);
        this.code = 'TASK_NOT_FOUND';
    }
}
exports.TaskNotFoundError = TaskNotFoundError;
//# sourceMappingURL=task-not-found.error.js.map