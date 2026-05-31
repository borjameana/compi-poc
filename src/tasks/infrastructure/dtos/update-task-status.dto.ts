import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../../domain/value-objects/task-status';

export class UpdateTaskStatusDto {
    @ApiProperty({
        description: 'New task status',
        enum: TaskStatus,
    })
    @IsEnum(TaskStatus)
    status!: TaskStatus;
}