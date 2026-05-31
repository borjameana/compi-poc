import { Inject, Injectable, Logger } from '@nestjs/common';
import { TaskEntity } from '../domain/entities/task.entity';
import { TaskPriority } from '../domain/value-objects/task-priority';
import { CreateTaskInput, TASKS_REPOSITORY, TasksRepository } from './tasks.repository';

@Injectable()
export class CreateTask {
    private readonly logger = new Logger(CreateTask.name);

    constructor(
        @Inject(TASKS_REPOSITORY)
        private readonly tasksRepository: TasksRepository,
    ) { }

    async call(input: CreateTaskInput): Promise<TaskEntity> {
        const payload: CreateTaskInput = {
            ...input,
            priority: input.priority ?? TaskPriority.MEDIUM,
        };

        this.logger.log('Creating task', {
            title: payload.title,
            priority: payload.priority,
        });

        return this.tasksRepository.create(payload);
    }
}