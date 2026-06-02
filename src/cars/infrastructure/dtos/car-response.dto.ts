import { ApiProperty } from '@nestjs/swagger';
import { CarEntity } from '../../domain/entities/car.entity';

export class CarResponseDto {
    @ApiProperty({ description: 'The unique identifier of the car', example: 'a1b2c3d4e5f6a7b8c9d0e1f2' })
    id!: string;

    @ApiProperty({ description: 'The license plate of the car', example: 'ABC-123' })
    plate!: string;

    @ApiProperty({ description: 'The brand of the car', example: 'Toyota' })
    brand!: string;

    @ApiProperty({ description: 'The model of the car', example: 'Corolla' })
    model!: string;

    @ApiProperty({ description: 'The manufacturing year of the car', example: 2020 })
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
