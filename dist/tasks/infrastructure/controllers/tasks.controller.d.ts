import { CreateTask } from '../../application/create-task';
import { DeleteTask } from '../../application/delete-task';
import { GetTask } from '../../application/get-task';
import { ListTasks } from '../../application/list-tasks';
import { UpdateTaskStatus } from '../../application/update-task-status';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { ListTasksQueryDto } from '../dtos/list-tasks-query.dto';
import { TaskResponseDto } from '../dtos/task-response.dto';
import { UpdateTaskStatusDto } from '../dtos/update-task-status.dto';
export declare class TasksController {
    private readonly createTask;
    private readonly listTasks;
    private readonly getTask;
    private readonly updateTaskStatus;
    private readonly deleteTask;
    constructor(createTask: CreateTask, listTasks: ListTasks, getTask: GetTask, updateTaskStatus: UpdateTaskStatus, deleteTask: DeleteTask);
    create(dto: CreateTaskDto): Promise<TaskResponseDto>;
    findAll(query: ListTasksQueryDto): Promise<TaskResponseDto[]>;
    findOne(id: string): Promise<TaskResponseDto>;
    updateStatus(id: string, dto: UpdateTaskStatusDto): Promise<TaskResponseDto>;
    remove(id: string): Promise<void>;
    private throwDomainErrors;
}
