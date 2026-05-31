import { CarEntity } from '../../domain/entities/car.entity';
export declare class CarResponseDto {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    static from(entity: CarEntity): CarResponseDto;
}
