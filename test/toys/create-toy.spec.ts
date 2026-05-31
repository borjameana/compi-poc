import { CreateToy } from '../../src/toys/application/create-toy';
import { CreateToyInput, ToysRepository } from '../../src/toys/application/toys.repository';
import { ToyEntity } from '../../src/toys/domain/entities/toy.entity';

describe('CreateToy', () => {
    it('creates a toy', async () => {
        const repo: ToysRepository = {
            findAll: async () => [],
            findById: async () => null,
            create: async (input: CreateToyInput) =>
                new ToyEntity({
                    id: 'toy-1',
                    price: input.price,
                    brand: input.brand,
                    model: input.model,
                    color: input.color,
                    age: input.age,
                    createdAt: new Date('2024-01-01'),
                    updatedAt: new Date('2024-01-01'),
                }),
            update: async () => null,
            delete: async () => false,
        };

        const useCase = new CreateToy(repo);
        const result = await useCase.call({
            price: 19.99,
            brand: 'LEGO',
            model: 'City Set',
            color: 'Red',
            age: 7,
        });

        expect(result.id).toBe('toy-1');
        expect(result.price).toBe(19.99);
        expect(result.brand).toBe('LEGO');
        expect(result.model).toBe('City Set');
        expect(result.color).toBe('Red');
        expect(result.age).toBe(7);
    });
});
