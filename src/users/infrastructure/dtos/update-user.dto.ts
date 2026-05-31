import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    surname?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(120)
    age?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    country?: string;
}
