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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_task_1 = require("../../application/create-task");
const delete_task_1 = require("../../application/delete-task");
const get_task_1 = require("../../application/get-task");
const list_tasks_1 = require("../../application/list-tasks");
const update_task_status_1 = require("../../application/update-task-status");
const invalid_task_status_transition_error_1 = require("../../domain/errors/invalid-task-status-transition.error");
const task_not_found_error_1 = require("../../domain/errors/task-not-found.error");
const create_task_dto_1 = require("../dtos/create-task.dto");
const list_tasks_query_dto_1 = require("../dtos/list-tasks-query.dto");
const task_response_dto_1 = require("../dtos/task-response.dto");
const update_task_status_dto_1 = require("../dtos/update-task-status.dto");
let TasksController = class TasksController {
    constructor(createTask, listTasks, getTask, updateTaskStatus, deleteTask) {
        this.createTask = createTask;
        this.listTasks = listTasks;
        this.getTask = getTask;
        this.updateTaskStatus = updateTaskStatus;
        this.deleteTask = deleteTask;
    }
    async create(dto) {
        const task = await this.createTask.call(dto);
        return task_response_dto_1.TaskResponseDto.from(task);
    }
    async findAll(query) {
        const tasks = await this.listTasks.call(query);
        return tasks.map((task) => task_response_dto_1.TaskResponseDto.from(task));
    }
    async findOne(id) {
        try {
            const task = await this.getTask.call(id);
            return task_response_dto_1.TaskResponseDto.from(task);
        }
        catch (error) {
            this.throwDomainErrors(error);
            throw error;
        }
    }
    async updateStatus(id, dto) {
        try {
            const task = await this.updateTaskStatus.call(id, dto.status);
            return task_response_dto_1.TaskResponseDto.from(task);
        }
        catch (error) {
            this.throwDomainErrors(error);
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.deleteTask.call(id);
        }
        catch (error) {
            this.throwDomainErrors(error);
            throw error;
        }
    }
    throwDomainErrors(error) {
        if (error instanceof task_not_found_error_1.TaskNotFoundError) {
            throw new common_1.NotFoundException(error.message);
        }
        if (error instanceof invalid_task_status_transition_error_1.InvalidTaskStatusTransitionError) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Created', type: task_response_dto_1.TaskResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Validation error' }),
    (0, swagger_1.ApiBody)({ type: create_task_dto_1.CreateTaskDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK', type: task_response_dto_1.TaskResponseDto, isArray: true }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Validation error' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_tasks_query_dto_1.ListTasksQueryDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK', type: task_response_dto_1.TaskResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Task not found' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK', type: task_response_dto_1.TaskResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Validation error or invalid status transition' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Task not found' }),
    (0, swagger_1.ApiBody)({ type: update_task_status_dto_1.UpdateTaskStatusDto }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_status_dto_1.UpdateTaskStatusDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Task not found' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "remove", null);
exports.TasksController = TasksController = __decorate([
    (0, swagger_1.ApiTags)('tasks'),
    (0, common_1.Controller)('api/tasks'),
    __metadata("design:paramtypes", [create_task_1.CreateTask,
        list_tasks_1.ListTasks,
        get_task_1.GetTask,
        update_task_status_1.UpdateTaskStatus,
        delete_task_1.DeleteTask])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map