import { ApiProperty } from '@nestjs/swagger';
import { ToyEntity } from '../../domain/entities/toy.entity';

export class ToyResponseDto {
    @ApiProperty({ description: 'Unique identifier of the toy', example: 'f8e7d6c5-b4a3-2109-fedc-ba9876543210' })
    id!: string;

    @ApiProperty({ description: 'Price of the toy', example: 25.99 })
    price!: number;

    @ApiProperty({ description: 'Brand of the toy', example: 'Lego' })
    brand!: string;

    @ApiProperty({ description: 'Model of the toy', example: 'Castle' })
    model!: string;

    @ApiProperty({ description: 'Color of the toy', example: 'Red' })
    color!: string;

    @ApiProperty({ description: 'Recommended age for the toy', example: 6 })
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
