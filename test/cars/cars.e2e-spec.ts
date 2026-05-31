import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { validationPipe } from '../../src/shared/infrastructure/pipes/options.validation.pipe';
import { CarsModule } from '../../src/cars/cars.module';

describe('CarsController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [CarsModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(validationPipe);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /cars', async () => {
        const response = await request(app.getHttpServer())
            .post('/cars')
            .send({
                plate: '5678-DEF',
                brand: 'Tesla',
                model: 'Model 3',
                year: 2022,
            })
            .expect(201);

        expect(response.body).toMatchObject({
            plate: '5678-DEF',
            brand: 'Tesla',
            model: 'Model 3',
            year: 2022,
        });
        expect(response.body.id).toBeDefined();
    });

    it('GET /cars', async () => {
        const response = await request(app.getHttpServer())
            .get('/cars')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });
});
