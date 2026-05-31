import { Inject, Injectable, Logger } from '@nestjs/common';
import { TaskEntity } from '../domain/entities/task.entity';
import { ListTasksFilters, TASKS_REPOSITORY, TasksRepository } from './tasks.repository';

@Injectable()
export class ListTasks {
    private readonly logger = new Logger(ListTasks.name);

    constructor(
        @Inject(TASKS_REPOSITORY)
        private readonly tasksRepository: TasksRepository,
    ) { }

    async call(filters: ListTasksFilters): Promise<TaskEntity[]> {
        this.logger.log('Listing tasks', filters);
        return this.tasksRepository.findAll(filters);
    }
}