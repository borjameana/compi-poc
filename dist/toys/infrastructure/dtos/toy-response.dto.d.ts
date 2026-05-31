import { ToyEntity } from '../../domain/entities/toy.entity';
export declare class ToyResponseDto {
    id: string;
    price: number;
    brand: string;
    model: string;
    color: string;
    age: number;
    static from(entity: ToyEntity): ToyResponseDto;
}
