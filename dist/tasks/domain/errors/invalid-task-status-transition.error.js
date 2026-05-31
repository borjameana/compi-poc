"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTaskStatusTransitionError = void 0;
class InvalidTaskStatusTransitionError extends Error {
    constructor(from, to) {
        super(`Invalid task status transition: ${from} -> ${to}`);
        this.code = 'INVALID_TASK_STATUS_TRANSITION';
    }
}
exports.InvalidTaskStatusTransitionError = InvalidTaskStatusTransitionError;
//# sourceMappingURL=invalid-task-status-transition.error.js.map