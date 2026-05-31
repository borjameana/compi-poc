import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
    CreateTaskInput,
    ListTasksFilters,
    TasksRepository,
} from '../../application/tasks.repository';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskPriority } from '../../domain/value-objects/task-priority';
import { TaskStatus } from '../../domain/value-objects/task-status';
import { TaskOrmEntity } from './task.orm-entity';

@Injectable()
export class TypeormTasksRepository implements TasksRepository {
    constructor(
        @InjectRepository(TaskOrmEntity)
        private readonly repository: Repository<TaskOrmEntity>,
    ) { }

    async create(input: CreateTaskInput): Promise<TaskEntity> {
        const entity = this.repository.create({
            title: input.title,
            description: input.description ?? null,
            priority: input.priority ?? TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
        });

        const saved = await this.repository.save(entity);
        return saved.toDomain();
    }

    async findAll(filters: ListTasksFilters): Promise<TaskEntity[]> {
        const tasks = await this.repository.find({
            where: {
                deletedAt: IsNull(),
                ...(filters.status ? { status: filters.status } : {}),
                ...(filters.priority ? { priority: filters.priority } : {}),
            },
            order: { createdAt: 'DESC' },
        });

        return tasks.map((task) => task.toDomain());
    }

    async findById(id: string): Promise<TaskEntity | null> {
        const task = await this.repository.findOne({
            where: {
                id,
                deletedAt: IsNull(),
            },
        });

        return task ? task.toDomain() : null;
    }

    async updateStatus(id: string, status: TaskStatus): Promise<TaskEntity | null> {
        const task = await this.repository.findOne({
            where: {
                id,
                deletedAt: IsNull(),
            },
        });

        if (!task) {
            return null;
        }

        task.status = status;
        const updated = await this.repository.save(task);
        return updated.toDomain();
    }

    async softDelete(id: string): Promise<boolean> {
        const task = await this.repository.findOne({
            where: {
                id,
                deletedAt: IsNull(),
            },
        });

        if (!task) {
            return false;
        }

        await this.repository.softDelete({ id });
        return true;
    }
}