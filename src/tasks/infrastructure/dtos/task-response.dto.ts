import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskEntity } from '../../domain/entities/task.entity';
import { TaskPriority } from '../../domain/value-objects/task-priority';
import { TaskStatus } from '../../domain/value-objects/task-status';

export class TaskResponseDto {
    @ApiProperty({
        description: 'Task id',
        format: 'uuid',
    })
    id!: string;

    @ApiProperty({
        description: 'Task title',
    })
    title!: string;

    @ApiPropertyOptional({
        description: 'Task description',
        nullable: true,
    })
    description!: string | null;

    @ApiProperty({
        description: 'Task priority',
        enum: TaskPriority,
    })
    priority!: TaskPriority;

    @ApiProperty({
        description: 'Task status',
        enum: TaskStatus,
    })
    status!: TaskStatus;

    @ApiProperty({
        description: 'Creation date',
        type: String,
        format: 'date-time',
    })
    createdAt!: Date;

    @ApiProperty({
        description: 'Last update date',
        type: String,
        format: 'date-time',
    })
    updatedAt!: Date;

    static from(task: TaskEntity): TaskResponseDto {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        };
    }
}