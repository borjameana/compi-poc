import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateTask } from '../../application/create-task';
import { DeleteTask } from '../../application/delete-task';
import { GetTask } from '../../application/get-task';
import { ListTasks } from '../../application/list-tasks';
import { UpdateTaskStatus } from '../../application/update-task-status';
import { InvalidTaskStatusTransitionError } from '../../domain/errors/invalid-task-status-transition.error';
import { TaskNotFoundError } from '../../domain/errors/task-not-found.error';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { ListTasksQueryDto } from '../dtos/list-tasks-query.dto';
import { TaskResponseDto } from '../dtos/task-response.dto';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto';

@ApiTags('tasks')
@Controller('api/tasks')
export class TasksController {
    constructor(
        private readonly createTask: CreateTask,
        private readonly listTasks: ListTasks,
        private readonly getTask: GetTask,
        private readonly updateTaskStatus: UpdateTaskStatus,
        private readonly deleteTask: DeleteTask,
    ) { }

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Created', type: TaskResponseDto })
    @ApiBadRequestResponse({ description: 'Validation error' })
    @ApiBody({ type: CreateTaskDto })
    async create(@Body() dto: CreateTaskDto): Promise<TaskResponseDto> {
        console.log('[TasksController] INPUT:', JSON.stringify(dto));
        const task = await this.createTask.call(dto);
        const result = TaskResponseDto.from(task);
        console.log('[TasksController] OUTPUT:', JSON.stringify(result));
        return result;
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK', type: TaskResponseDto, isArray: true })
    @ApiBadRequestResponse({ description: 'Validation error' })
    async findAll(@Query() query: ListTasksQueryDto): Promise<TaskResponseDto[]> {
        const tasks = await this.listTasks.call(query);
        return tasks.map((task) => TaskResponseDto.from(task));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK', type: TaskResponseDto })
    @ApiNotFoundResponse({ description: 'Task not found' })
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<TaskResponseDto> {
        try {
            const task = await this.getTask.call(id);
            return TaskResponseDto.from(task);
        } catch (error) {
            this.throwDomainErrors(error);
            throw error;
        }
    }

    @Patch(':id/status')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK', type: TaskResponseDto })
    @ApiBadRequestResponse({ description: 'Validation error or invalid status transition' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    @ApiBody({ type: UpdateTaskStatusDto })
    async updateStatus(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() dto: UpdateTaskStatusDto,
    ): Promise<TaskResponseDto> {
        try {
            const task = await this.updateTaskStatus.call(id, dto.status);
            return TaskResponseDto.from(task);
        } catch (error) {
            this.throwDomainErrors(error);
            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({ description: 'Deleted' })
    @ApiNotFoundResponse({ description: 'Task not found' })
    async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        try {
            await this.deleteTask.call(id);
        } catch (error) {
            this.throwDomainErrors(error);
            throw error;
        }
    }

    private throwDomainErrors(error: unknown): void {
        if (error instanceof TaskNotFoundError) {
            throw new NotFoundException(error.message);
        }
        if (error instanceof InvalidTaskStatusTransitionError) {
            throw new BadRequestException(error.message);
        }
    }
}