import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { validationPipe } from '../../src/shared/infrastructure/pipes/options.validation.pipe';
import { UsersModule } from '../../src/users/users.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [UsersModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(validationPipe);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /users', async () => {
        const response = await request(app.getHttpServer())
            .post('/users')
            .send({
                name: 'Mario',
                surname: 'Rossi',
                age: 35,
                country: 'IT',
            })
            .expect(201);

        expect(response.body).toMatchObject({
            name: 'Mario',
            surname: 'Rossi',
            age: 35,
            country: 'IT',
        });
        expect(response.body.id).toBeDefined();
    });

    it('GET /users', async () => {
        const response = await request(app.getHttpServer())
            .get('/users')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});
