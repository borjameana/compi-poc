import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    surname!: string;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(120)
    age!: number;

    @IsString()
    @IsNotEmpty()
    country!: string;
}
