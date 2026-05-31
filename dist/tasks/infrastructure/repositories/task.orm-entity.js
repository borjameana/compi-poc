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
var TaskOrmEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("../../domain/entities/task.entity");
const task_priority_1 = require("../../domain/value-objects/task-priority");
const task_status_1 = require("../../domain/value-objects/task-status");
let TaskOrmEntity = TaskOrmEntity_1 = class TaskOrmEntity {
    toDomain() {
        return new task_entity_1.TaskEntity({
            id: this.id,
            title: this.title,
            description: this.description,
            priority: this.priority,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        });
    }
    static fromDomain(task) {
        const entity = new TaskOrmEntity_1();
        entity.id = task.id;
        entity.title = task.title;
        entity.description = task.description;
        entity.priority = task.priority;
        entity.status = task.status;
        entity.createdAt = task.createdAt;
        entity.updatedAt = task.updatedAt;
        entity.deletedAt = task.deletedAt;
        return entity;
    }
};
exports.TaskOrmEntity = TaskOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TaskOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], TaskOrmEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2000, nullable: true }),
    __metadata("design:type", Object)
], TaskOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: task_priority_1.TaskPriority.MEDIUM,
    }),
    __metadata("design:type", String)
], TaskOrmEntity.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: task_status_1.TaskStatus.TODO,
    }),
    __metadata("design:type", String)
], TaskOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TaskOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TaskOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ nullable: true }),
    __metadata("design:type", Object)
], TaskOrmEntity.prototype, "deletedAt", void 0);
exports.TaskOrmEntity = TaskOrmEntity = TaskOrmEntity_1 = __decorate([
    (0, typeorm_1.Entity)('tasks'),
    (0, typeorm_1.Index)(['status', 'deletedAt']),
    (0, typeorm_1.Index)(['priority', 'deletedAt'])
], TaskOrmEntity);
//# sourceMappingURL=task.orm-entity.js.map