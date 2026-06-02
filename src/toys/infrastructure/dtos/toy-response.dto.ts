import { ApiProperty } from '@nestjs/swagger';
import { ToyEntity } from '../../domain/entities/toy.entity';

export class ToyResponseDto {
    @ApiProperty({ description: 'The unique identifier of the toy', example: '1a2b3c4d5e6f7a8b9c0d1e2f' })
    id!: string;

    @ApiProperty({ description: 'The price of the toy', example: 25.99 })
    price!: number;

    @ApiProperty({ description: 'The brand of the toy', example: 'Lego' })
    brand!: string;

    @ApiProperty({ description: 'The model of the toy', example: 'Castle' })
    model!: string;

    @ApiProperty({ description: 'The color of the toy', example: 'red' })
    color!: string;

    @ApiProperty({ description: 'The recommended age for the toy', example: 8 })
    age!: number;

    static from(entity: ToyEntity): ToyResponseDto {
        return {
            id: entity.id,
            price: entity.price,
            brand: entity.brand,
            model: entity.model,
            color: entity.color,
            age: entity.age,
        };
    }
}
