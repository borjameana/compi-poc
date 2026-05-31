import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserResponseDto {
    @ApiProperty({ description: 'Unique identifier of the user', example: '1a2b3c4d-5e6f-7890-1234-567890abcdef' })
    id!: string;

    @ApiProperty({ description: 'First name of the user', example: 'John' })
    name!: string;

    @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
    surname!: string;

    @ApiProperty({ description: 'Age of the user', example: 30 })
    age!: number;

    @ApiProperty({ description: 'Country of residence of the user', example: 'USA' })
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
