import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserResponseDto {
    @ApiProperty({ description: 'The unique identifier of the user', example: 'user-123-abc' })
    id!: string;

    @ApiProperty({ description: 'The name of the user', example: 'John' })
    name!: string;

    @ApiProperty({ description: 'The surname of the user', example: 'Doe' })
    surname!: string;

    @ApiProperty({ description: 'The age of the user', example: 30 })
    age!: number;

    @ApiProperty({ description: 'The country of residence of the user', example: 'USA' })
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
