import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateCarDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    plate?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    brand?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    model?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1886)
    @Max(2100)
    year?: number;
}
