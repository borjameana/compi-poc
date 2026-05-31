import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTask } from './application/create-task';
import { DeleteTask } from './application/delete-task';
import { GetTask } from './application/get-task';
import { ListTasks } from './application/list-tasks';
import { TASKS_REPOSITORY } from './application/tasks.repository';
import { UpdateTaskStatus } from './application/update-task-status';
import { TasksController } from './infrastructure/controllers/tasks.controller';
import { TaskOrmEntity } from './infrastructure/repositories/task.orm-entity';
import { TypeormTasksRepository } from './infrastructure/repositories/typeorm-tasks.repository';

@Module({
    imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
    controllers: [TasksController],
    providers: [
        CreateTask,
        ListTasks,
        GetTask,
        UpdateTaskStatus,
        DeleteTask,
        {
            provide: TASKS_REPOSITORY,
            useClass: TypeormTasksRepository,
        },
    ],
    exports: [CreateTask, ListTasks, GetTask, UpdateTaskStatus, DeleteTask],
})
export class TasksModule { }