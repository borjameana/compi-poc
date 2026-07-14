import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
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
    private readonly logger = new Logger(TasksController.name);
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
        this.logger.log({ operation: 'create', dto });
        const task = await this.createTask.call(dto);
        this.logger.log({ operation: 'create', status: 'completed', taskId: task.id.value });
        return TaskResponseDto.from(task);
    }

    @Get()
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK', type: TaskResponseDto, isArray: true })
    @ApiBadRequestResponse({ description: 'Validation error' })
    async findAll(@Query() query: ListTasksQueryDto): Promise<TaskResponseDto[]> {
        this.logger.log({ operation: 'findAll', query });
        const tasks = await this.listTasks.call(query);
        this.logger.log({ operation: 'findAll', status: 'completed', count: tasks.length });
        return tasks.map((task) => TaskResponseDto.from(task));
    }

    @Get(':id')
    @ApiOkResponse({ status: HttpStatus.OK, description: 'OK', type: TaskResponseDto })
    @ApiNotFoundResponse({ description: 'Task not found' })
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<TaskResponseDto> {
        this.logger.log({ operation: 'findOne', id });
        try {
            const task = await this.getTask.call(id);
            this.logger.log({ operation: 'findOne', status: 'completed', taskId: task.id.value });
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
        this.logger.log({ operation: 'updateStatus', id, dto });
        try {
            const task = await this.updateTaskStatus.call(id, dto.status);
            this.logger.log({ operation: 'updateStatus', status: 'completed', taskId: task.id.value, newStatus: task.status });
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
        this.logger.log({ operation: 'remove', id });
        try {
            await this.deleteTask.call(id);
            this.logger.log({ operation: 'remove', status: 'completed', taskId: id });
        } catch (error) {
            this.throwDomainErrors(error);
            throw error;
        }
    }

    private throwDomainErrors(error: unknown): void {
        if (error instanceof TaskNotFoundError) {
            this.logger.warn({ operation: 'throwDomainErrors', message: error.message, error: error.name });
            throw new NotFoundException(error.message);
        }
        if (error instanceof InvalidTaskStatusTransitionError) {
            throw new BadRequestException(error.message);
        }
    }
}