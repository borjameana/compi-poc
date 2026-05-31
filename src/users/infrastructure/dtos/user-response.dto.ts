import { UserEntity } from '../../domain/entities/user.entity';

export class UserResponseDto {
    id!: string;
    name!: string;
    surname!: string;
    age!: number;
    country!: string;

    static from(entity: UserEntity): UserResponseDto {
        return {
            id: entity.id,
            name: entity.name,
            surname: entity.surname,
            age: entity.age,
            country: entity.country,
        };
    }
}
