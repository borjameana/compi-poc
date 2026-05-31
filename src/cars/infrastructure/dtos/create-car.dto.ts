import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    plate!: string;

    @IsString()
    @IsNotEmpty()
    brand!: string;

    @IsString()
    @IsNotEmpty()
    model!: string;

    @Type(() => Number)
    @IsInt()
    @Min(1886)
    @Max(2100)
    year!: number;
}
