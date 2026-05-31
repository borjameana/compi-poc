import { UserEntity } from '../../domain/entities/user.entity';
export declare class UserResponseDto {
    id: string;
    name: string;
    surname: string;
    age: number;
    country: string;
    static from(entity: UserEntity): UserResponseDto;
}
