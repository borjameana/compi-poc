import { CreateTask } from '../../src/tasks/application/create-task';
import { CreateTaskInput, TasksRepository } from '../../src/tasks/application/tasks.repository';
import { TaskEntity } from '../../src/tasks/domain/entities/task.entity';
import { TaskPriority } from '../../src/tasks/domain/value-objects/task-priority';
import { TaskStatus } from '../../src/tasks/domain/value-objects/task-status';

describe('CreateTask', () => {
    it('creates a task with default priority', async () => {
        const repo: TasksRepository = {
            create: async (input: CreateTaskInput) =>
                new TaskEntity({
                    id: 'task-1',
                    title: input.title,
                    description: input.description ?? null,
                    priority: input.priority ?? TaskPriority.MEDIUM,
                    status: TaskStatus.TODO,
                    createdAt: new Date('2024-01-01'),
                    updatedAt: new Date('2024-01-01'),
                    deletedAt: null,
                }),
            findAll: async () => [],
            findById: async () => null,
            updateStatus: async () => null,
            softDelete: async () => false,
        };

        const useCase = new CreateTask(repo);
        const result = await useCase.call({
            title: 'Implementar endpoint',
            description: 'Crear endpoint para exportar tareas',
        });

        expect(result.id).toBe('task-1');
        expect(result.title).toBe('Implementar endpoint');
        expect(result.description).toBe('Crear endpoint para exportar tareas');
        expect(result.priority).toBe(TaskPriority.MEDIUM);
        expect(result.status).toBe(TaskStatus.TODO);
    });
});