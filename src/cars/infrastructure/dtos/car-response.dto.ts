import { ApiProperty } from '@nestjs/swagger';
import { CarEntity } from '../../domain/entities/car.entity';

export class CarResponseDto {
    @ApiProperty({ description: 'Unique identifier of the car', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
    id!: string;

    @ApiProperty({ description: 'License plate of the car', example: 'ABC-123' })
    plate!: string;

    @ApiProperty({ description: 'Brand of the car', example: 'Toyota' })
    brand!: string;

    @ApiProperty({ description: 'Model of the car', example: 'Corolla' })
    model!: string;

    @ApiProperty({ description: 'Manufacturing year of the car', example: 2020 })
    year!: number;

    static from(entity: CarEntity): CarResponseDto {
        return {
            id: entity.id,
            plate: entity.plate,
            brand: entity.brand,
            model: entity.model,
            year: entity.year,
        };
    }
}
