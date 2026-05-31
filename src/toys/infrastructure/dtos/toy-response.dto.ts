import { ToyEntity } from '../../domain/entities/toy.entity';

export class ToyResponseDto {
    id!: string;
    price!: number;
    brand!: string;
    model!: string;
    color!: string;
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
