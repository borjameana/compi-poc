import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { validationPipe } from '../../src/shared/infrastructure/pipes/options.validation.pipe';
import { ToysModule } from '../../src/toys/toys.module';

describe('ToysController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [ToysModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(validationPipe);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /toys', async () => {
        const response = await request(app.getHttpServer())
            .post('/toys')
            .send({
                price: 12.5,
                brand: 'Hasbro',
                model: 'Play-Doh Set',
                color: 'Multi',
                age: 4,
            })
            .expect(201);

        expect(response.body).toMatchObject({
            price: 12.5,
            brand: 'Hasbro',
            model: 'Play-Doh Set',
            color: 'Multi',
            age: 4,
        });
        expect(response.body.id).toBeDefined();
    });

    it('GET /toys', async () => {
        const response = await request(app.getHttpServer())
            .get('/toys')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});
