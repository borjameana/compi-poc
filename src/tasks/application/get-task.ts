import { Inject, Injectable, Logger } from '@nestjs/common';
import { TaskEntity } from '../domain/entities/task.entity';
import { TaskNotFoundError } from '../domain/errors/task-not-found.error';
import { TASKS_REPOSITORY, TasksRepository } from './tasks.repository';

@Injectable()
export class GetTask {
    private readonly logger = new Logger(GetTask.name);

    constructor(
        @Inject(TASKS_REPOSITORY)
        private readonly tasksRepository: TasksRepository,
    ) { }

    async call(id: string): Promise<TaskEntity> {
        const task = await this.tasksRepository.findById(id);
        if (!task) {
            this.logger.warn('Task not found', { id });
            throw new TaskNotFoundError(id);
        }
        return task;
    }
}