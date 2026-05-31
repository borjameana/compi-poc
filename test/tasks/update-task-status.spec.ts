import { UpdateTaskStatus } from '../../src/tasks/application/update-task-status';
import { TasksRepository } from '../../src/tasks/application/tasks.repository';
import { TaskEntity } from '../../src/tasks/domain/entities/task.entity';
import { InvalidTaskStatusTransitionError } from '../../src/tasks/domain/errors/invalid-task-status-transition.error';
import { TaskPriority } from '../../src/tasks/domain/value-objects/task-priority';
import { TaskStatus } from '../../src/tasks/domain/value-objects/task-status';

describe('UpdateTaskStatus', () => {
    it('updates status for a valid transition TODO -> IN_PROGRESS', async () => {
        const current = new TaskEntity({
            id: 'task-1',
            title: 'Task',
            description: null,
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            deletedAt: null,
        });

        const repo: TasksRepository = {
            create: async () => current,
            findAll: async () => [current],
            findById: async () => current,
            updateStatus: async (id: string, status: TaskStatus) =>
                new TaskEntity({
                    ...current,
                    id,
                    status,
                    updatedAt: new Date('2024-01-02'),
                }),
            softDelete: async () => false,
        };

        const useCase = new UpdateTaskStatus(repo);
        const result = await useCase.call('task-1', TaskStatus.IN_PROGRESS);

        expect(result.status).toBe(TaskStatus.IN_PROGRESS);
    });

    it('throws on invalid transition TODO -> DONE', async () => {
        const current = new TaskEntity({
            id: 'task-1',
            title: 'Task',
            description: null,
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            deletedAt: null,
        });

        const repo: TasksRepository = {
            create: async () => current,
            findAll: async () => [current],
            findById: async () => current,
            updateStatus: async () => null,
            softDelete: async () => false,
        };

        const useCase = new UpdateTaskStatus(repo);

        await expect(useCase.call('task-1', TaskStatus.DONE)).rejects.toBeInstanceOf(
            InvalidTaskStatusTransitionError,
        );
    });
});