"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UpdateTaskStatus_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskStatus = void 0;
const common_1 = require("@nestjs/common");
const invalid_task_status_transition_error_1 = require("../domain/errors/invalid-task-status-transition.error");
const task_not_found_error_1 = require("../domain/errors/task-not-found.error");
const task_status_1 = require("../domain/value-objects/task-status");
const tasks_repository_1 = require("./tasks.repository");
let UpdateTaskStatus = UpdateTaskStatus_1 = class UpdateTaskStatus {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
        this.logger = new common_1.Logger(UpdateTaskStatus_1.name);
    }
    async call(id, status) {
        const current = await this.tasksRepository.findById(id);
        if (!current) {
            this.logger.warn('Task not found', { id });
            throw new task_not_found_error_1.TaskNotFoundError(id);
        }
        if (!(0, task_status_1.isValidTaskStatusTransition)(current.status, status)) {
            this.logger.warn('Invalid task status transition', {
                id,
                from: current.status,
                to: status,
            });
            throw new invalid_task_status_transition_error_1.InvalidTaskStatusTransitionError(current.status, status);
        }
        const updated = await this.tasksRepository.updateStatus(id, status);
        if (!updated) {
            this.logger.warn('Task not found while updating status', { id });
            throw new task_not_found_error_1.TaskNotFoundError(id);
        }
        return updated;
    }
};
exports.UpdateTaskStatus = UpdateTaskStatus;
exports.UpdateTaskStatus = UpdateTaskStatus = UpdateTaskStatus_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tasks_repository_1.TASKS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateTaskStatus);
//# sourceMappingURL=update-task-status.js.map