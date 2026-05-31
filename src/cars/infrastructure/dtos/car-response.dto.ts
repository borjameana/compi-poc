import { CarEntity } from '../../domain/entities/car.entity';

export class CarResponseDto {
    id!: string;
    plate!: string;
    brand!: string;
    model!: string;
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
