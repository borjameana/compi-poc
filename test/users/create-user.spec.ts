import { CreateUser } from '../../src/users/application/create-user';
import { CreateUserInput, UsersRepository } from '../../src/users/application/users.repository';
import { UserEntity } from '../../src/users/domain/entities/user.entity';

describe('CreateUser', () => {
    it('creates a user', async () => {
        const repo: UsersRepository = {
            findAll: async () => [],
            findById: async () => null,
            create: async (input: CreateUserInput) =>
                new UserEntity({
                    id: 'user-1',
                    name: input.name,
                    surname: input.surname,
                    age: input.age,
                    country: input.country,
                    createdAt: new Date('2024-01-01'),
                    updatedAt: new Date('2024-01-01'),
                }),
            update: async () => null,
            delete: async () => false,
        };

        const useCase = new CreateUser(repo);
        const result = await useCase.call({
            name: 'Ana',
            surname: 'Lopez',
            age: 28,
            country: 'ES',
        });

        expect(result.id).toBe('user-1');
        expect(result.name).toBe('Ana');
        expect(result.surname).toBe('Lopez');
        expect(result.age).toBe(28);
        expect(result.country).toBe('ES');
    });
});
