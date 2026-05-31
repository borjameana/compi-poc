"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = void 0;
exports.isValidTaskStatusTransition = isValidTaskStatusTransition;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "TODO";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["DONE"] = "DONE";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
const TASK_STATUS_TRANSITIONS = {
    [TaskStatus.TODO]: [TaskStatus.IN_PROGRESS],
    [TaskStatus.IN_PROGRESS]: [TaskStatus.DONE, TaskStatus.TODO],
    [TaskStatus.DONE]: [],
};
function isValidTaskStatusTransition(from, to) {
    return TASK_STATUS_TRANSITIONS[from].includes(to);
}
//# sourceMappingURL=task-status.js.map