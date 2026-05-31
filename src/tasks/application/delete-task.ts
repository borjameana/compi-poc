import { Inject, Injectable, Logger } from '@nestjs/common';
import { TaskNotFoundError } from '../domain/errors/task-not-found.error';
import { TASKS_REPOSITORY, TasksRepository } from './tasks.repository';

@Injectable()
export class DeleteTask {
    private readonly logger = new Logger(DeleteTask.name);

    constructor(
        @Inject(TASKS_REPOSITORY)
        private readonly tasksRepository: TasksRepository,
    ) { }

    async call(id: string): Promise<void> {
        const deleted = await this.tasksRepository.softDelete(id);
        if (!deleted) {
            this.logger.warn('Task not found while deleting', { id });
            throw new TaskNotFoundError(id);
        }
    }
}