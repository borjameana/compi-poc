import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { validationPipe } from '../../src/shared/infrastructure/pipes/options.validation.pipe';
import { TasksModule } from '../../src/tasks/tasks.module';
import { TaskPriority } from '../../src/tasks/domain/value-objects/task-priority';
import { TaskStatus } from '../../src/tasks/domain/value-objects/task-status';
import { TaskOrmEntity } from '../../src/tasks/infrastructure/repositories/task.orm-entity';

describe('TasksController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    synchronize: true,
                    autoLoadEntities: true,
                }),
                TasksModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(validationPipe);
        await app.init();

        dataSource = app.get(DataSource);
    });

    beforeEach(async () => {
        await dataSource.getRepository(TaskOrmEntity).clear();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /api/tasks creates with valid body and returns 201', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/tasks')
            .send({
                title: 'Preparar demo',
                description: 'Revisar flujo completo con el equipo',
                priority: TaskPriority.HIGH,
            })
            .expect(201);

        expect(response.body).toMatchObject({
            title: 'Preparar demo',
            description: 'Revisar flujo completo con el equipo',
            priority: TaskPriority.HIGH,
            status: TaskStatus.TODO,
        });
        expect(response.body.id).toBeDefined();
    });

    it('POST /api/tasks with empty title returns 400', async () => {
        await request(app.getHttpServer())
            .post('/api/tasks')
            .send({
                title: '',
            })
            .expect(400);
    });

    it('GET /api/tasks lists with and without status/priority filters', async () => {
        const first = await request(app.getHttpServer())
            .post('/api/tasks')
            .send({
                title: 'Task A',
                priority: TaskPriority.MEDIUM,
            })
            .expect(201);

        const second = await request(app.getHttpServer())
            .post('/api/tasks')
            .send({
                title: 'Task B',
                priority: TaskPriority.HIGH,
            })
            .expect(201);

        await request(app.getHttpServer())
            .patch(`/api/tasks/${second.body.id}/status`)
            .send({ status: TaskStatus.IN_PROGRESS })
            .expect(200);

        const allTasks = await request(app.getHttpServer())
            .get('/api/tasks')
            .expect(200);

        expect(allTasks.body).toHaveLength(2);

        const byStatus = await request(app.getHttpServer())
            .get('/api/tasks')
            .query({ status: TaskStatus.IN_PROGRESS })
            .expect(200);

        expect(byStatus.body).toHaveLength(1);
        expect(byStatus.body[0].id).toBe(second.body.id);

        const byPriority = await request(app.getHttpServer())
            .get('/api/tasks')
            .query({ priority: TaskPriority.HIGH })
            .expect(200);

        expect(byPriority.body).toHaveLength(1);
        expect(byPriority.body[0].id).toBe(second.body.id);

        const byStatusAndPriority = await request(app.getHttpServer())
            .get('/api/tasks')
            .query({ status: TaskStatus.TODO, priority: TaskPriority.MEDIUM })
            .expect(200);

        expect(byStatusAndPriority.body).toHaveLength(1);
        expect(byStatusAndPriority.body[0].id).toBe(first.body.id);
    });

    it('GET /api/tasks/:id for non-existing task returns 404', async () => {
        await request(app.getHttpServer())
            .get('/api/tasks/63845f5a-78a5-4fca-b9f5-5bc2b2f506e7')
            .expect(404);
    });

    it('PATCH /api/tasks/:id/status valid transition TODO -> IN_PROGRESS returns 200', async () => {
        const created = await request(app.getHttpServer())
            .post('/api/tasks')
            .send({
                title: 'Task to move',
            })
            .expect(201);

        const response = await request(app.getHttpServer())
            .patch(`/api/tasks/${created.body.id}/status`)
            .send({ status: TaskStatus.IN_PROGRESS })
            .expect(200);

        expect(response.body.status).toBe(TaskStatus.IN_PROGRESS);
    });

    it('PATCH /api/tasks/:id/status invalid transition TODO -> DONE returns 400', async () => {
        const created = await request(app.getHttpServer())
            .post('/api/tasks')
            .send({
                title: 'Task invalid transition',
            })
            .expect(201);

        await request(app.getHttpServer())
            .patch(`/api/tasks/${created.body.id}/status`)
            .send({ status: TaskStatus.DONE })
            .expect(400);
    });

    it('DELETE /api/tasks/:id returns 204 and then GET returns 404', async () => {
        const created = await request(app.getHttpServer())
            .post('/api/tasks')
            .send({
                title: 'Task to delete',
            })
            .expect(201);

        await request(app.getHttpServer())
            .delete(`/api/tasks/${created.body.id}`)
            .expect(204);

        await request(app.getHttpServer())
            .get(`/api/tasks/${created.body.id}`)
            .expect(404);
    });
});