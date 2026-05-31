import { CreateCar } from '../../src/cars/application/create-car';
import { CarsRepository, CreateCarInput } from '../../src/cars/application/cars.repository';
import { CarEntity } from '../../src/cars/domain/entities/car.entity';

describe('CreateCar', () => {
    it('creates a car', async () => {
        const repo: CarsRepository = {
            findAll: async () => [],
            findById: async () => null,
            create: async (input: CreateCarInput) =>
                new CarEntity({
                    id: 'car-1',
                    plate: input.plate,
                    brand: input.brand,
                    model: input.model,
                    year: input.year,
                    createdAt: new Date('2024-01-01'),
                    updatedAt: new Date('2024-01-01'),
                }),
            update: async () => null,
            delete: async () => false,
        };

        const useCase = new CreateCar(repo);
        const result = await useCase.call({
            plate: '1234-ABC',
            brand: 'Seat',
            model: 'Ibiza',
            year: 2020,
        });

        expect(result.id).toBe('car-1');
        expect(result.plate).toBe('1234-ABC');
        expect(result.brand).toBe('Seat');
        expect(result.model).toBe('Ibiza');
        expect(result.year).toBe(2020);
    });
});
