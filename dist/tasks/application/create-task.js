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
var CreateTask_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTask = void 0;
const common_1 = require("@nestjs/common");
const task_priority_1 = require("../domain/value-objects/task-priority");
const tasks_repository_1 = require("./tasks.repository");
let CreateTask = CreateTask_1 = class CreateTask {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
        this.logger = new common_1.Logger(CreateTask_1.name);
    }
    async call(input) {
        const payload = {
            ...input,
            priority: input.priority ?? task_priority_1.TaskPriority.MEDIUM,
        };
        this.logger.log('Creating task', {
            title: payload.title,
            priority: payload.priority,
        });
        return this.tasksRepository.create(payload);
    }
};
exports.CreateTask = CreateTask;
exports.CreateTask = CreateTask = CreateTask_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tasks_repository_1.TASKS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateTask);
//# sourceMappingURL=create-task.js.map