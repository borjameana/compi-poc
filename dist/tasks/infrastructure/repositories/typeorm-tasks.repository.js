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
exports.TypeormTasksRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_priority_1 = require("../../domain/value-objects/task-priority");
const task_status_1 = require("../../domain/value-objects/task-status");
const task_orm_entity_1 = require("./task.orm-entity");
let TypeormTasksRepository = class TypeormTasksRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(input) {
        const entity = this.repository.create({
            title: input.title,
            description: input.description ?? null,
            priority: input.priority ?? task_priority_1.TaskPriority.MEDIUM,
            status: task_status_1.TaskStatus.TODO,
        });
        const saved = await this.repository.save(entity);
        return saved.toDomain();
    }
    async findAll(filters) {
        const tasks = await this.repository.find({
            where: {
                deletedAt: (0, typeorm_2.IsNull)(),
                ...(filters.status ? { status: filters.status } : {}),
                ...(filters.priority ? { priority: filters.priority } : {}),
            },
            order: { createdAt: 'DESC' },
        });
        return tasks.map((task) => task.toDomain());
    }
    async findById(id) {
        const task = await this.repository.findOne({
            where: {
                id,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
        });
        return task ? task.toDomain() : null;
    }
    async updateStatus(id, status) {
        const task = await this.repository.findOne({
            where: {
                id,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
        });
        if (!task) {
            return null;
        }
        task.status = status;
        const updated = await this.repository.save(task);
        return updated.toDomain();
    }
    async softDelete(id) {
        const task = await this.repository.findOne({
            where: {
                id,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
        });
        if (!task) {
            return false;
        }
        await this.repository.softDelete({ id });
        return true;
    }
};
exports.TypeormTasksRepository = TypeormTasksRepository;
exports.TypeormTasksRepository = TypeormTasksRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_orm_entity_1.TaskOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormTasksRepository);
//# sourceMappingURL=typeorm-tasks.repository.js.map