import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateToyDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price!: number;

    @IsString()
    @IsNotEmpty()
    brand!: string;

    @IsString()
    @IsNotEmpty()
    model!: string;

    @IsString()
    @IsNotEmpty()
    color!: string;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(18)
    age!: number;
}
