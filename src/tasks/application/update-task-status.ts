import { Inject, Injectable, Logger } from '@nestjs/common';
import { TaskEntity } from '../domain/entities/task.entity';
import { InvalidTaskStatusTransitionError } from '../domain/errors/invalid-task-status-transition.error';
import { TaskNotFoundError } from '../domain/errors/task-not-found.error';
import { isValidTaskStatusTransition, TaskStatus } from '../domain/value-objects/task-status';
import { TASKS_REPOSITORY, TasksRepository } from './tasks.repository';

@Injectable()
export class UpdateTaskStatus {
    private readonly logger = new Logger(UpdateTaskStatus.name);

    constructor(
        @Inject(TASKS_REPOSITORY)
        private readonly tasksRepository: TasksRepository,
    ) { }

    async call(id: string, status: TaskStatus): Promise<TaskEntity> {
        const current = await this.tasksRepository.findById(id);
        if (!current) {
            this.logger.warn('Task not found', { id });
            throw new TaskNotFoundError(id);
        }

        if (!isValidTaskStatusTransition(current.status, status)) {
            this.logger.warn('Invalid task status transition', {
                id,
                from: current.status,
                to: status,
            });
            throw new InvalidTaskStatusTransitionError(current.status, status);
        }

        const updated = await this.tasksRepository.updateStatus(id, status);
        if (!updated) {
            this.logger.warn('Task not found while updating status', { id });
            throw new TaskNotFoundError(id);
        }

        return updated;
    }
}