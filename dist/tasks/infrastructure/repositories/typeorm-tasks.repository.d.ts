import { Repository } from 'typeorm';
import { CreateTaskInput, ListTasksFilters, TasksRepository } from '../../application/tasks.repository';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskStatus } from '../../domain/value-objects/task-status';
import { TaskOrmEntity } from './task.orm-entity';
export declare class TypeormTasksRepository implements TasksRepository {
    private readonly repository;
    constructor(repository: Repository<TaskOrmEntity>);
    create(input: CreateTaskInput): Promise<TaskEntity>;
    findAll(filters: ListTasksFilters): Promise<TaskEntity[]>;
    findById(id: string): Promise<TaskEntity | null>;
    updateStatus(id: string, status: TaskStatus): Promise<TaskEntity | null>;
    softDelete(id: string): Promise<boolean>;
}
