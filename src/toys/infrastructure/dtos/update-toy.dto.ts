import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateToyDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    brand?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    model?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    color?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(18)
    age?: number;
}
