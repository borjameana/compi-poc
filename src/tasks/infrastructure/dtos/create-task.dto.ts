import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TaskPriority } from '../../domain/value-objects/task-priority';

export class CreateTaskDto {
    @ApiProperty({
        description: 'Task title',
        example: 'Preparar informe semanal',
        minLength: 1,
        maxLength: 120,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(120)
    title!: string;

    @ApiPropertyOptional({
        description: 'Task description',
        example: 'Recopilar métricas y redactar resumen para la reunión del lunes.',
        maxLength: 2000,
    })
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    description?: string;

    @ApiPropertyOptional({
        description: 'Task priority',
        enum: TaskPriority,
        default: TaskPriority.MEDIUM,
    })
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;
}