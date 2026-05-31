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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_priority_1 = require("../../domain/value-objects/task-priority");
const task_status_1 = require("../../domain/value-objects/task-status");
class TaskResponseDto {
    static from(task) {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        };
    }
}
exports.TaskResponseDto = TaskResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Task id',
        format: 'uuid',
    }),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Task title',
    }),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Task description',
        nullable: true,
    }),
    __metadata("design:type", Object)
], TaskResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Task priority',
        enum: task_priority_1.TaskPriority,
    }),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Task status',
        enum: task_status_1.TaskStatus,
    }),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation date',
        type: String,
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], TaskResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update date',
        type: String,
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], TaskResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=task-response.dto.js.map