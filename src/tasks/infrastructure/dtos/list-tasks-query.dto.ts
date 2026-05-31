import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskPriority } from '../../domain/value-objects/task-priority';
import { TaskStatus } from '../../domain/value-objects/task-status';

export class ListTasksQueryDto {
    @ApiPropertyOptional({
        description: 'Filter by task status',
        enum: TaskStatus,
    })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiPropertyOptional({
        description: 'Filter by task priority',
        enum: TaskPriority,
    })
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;
}