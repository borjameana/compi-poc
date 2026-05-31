import { DeleteTask } from '../../src/tasks/application/delete-task';
import { TasksRepository } from '../../src/tasks/application/tasks.repository';
import { TaskNotFoundError } from '../../src/tasks/domain/errors/task-not-found.error';

describe('DeleteTask', () => {
    it('soft deletes an existing task', async () => {
        const repo: TasksRepository = {
            create: async () => {
                throw new Error('Not implemented in this test');
            },
            findAll: async () => [],
            findById: async () => null,
            updateStatus: async () => null,
            softDelete: async () => true,
        };

        const useCase = new DeleteTask(repo);

        await expect(useCase.call('task-1')).resolves.toBeUndefined();
    });

    it('throws when task does not exist', async () => {
        const repo: TasksRepository = {
            create: async () => {
                throw new Error('Not implemented in this test');
            },
            findAll: async () => [],
            findById: async () => null,
            updateStatus: async () => null,
            softDelete: async () => false,
        };

        const useCase = new DeleteTask(repo);

        await expect(useCase.call('task-unknown')).rejects.toBeInstanceOf(TaskNotFoundError);
    });
});