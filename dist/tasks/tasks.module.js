"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_task_1 = require("./application/create-task");
const delete_task_1 = require("./application/delete-task");
const get_task_1 = require("./application/get-task");
const list_tasks_1 = require("./application/list-tasks");
const tasks_repository_1 = require("./application/tasks.repository");
const update_task_status_1 = require("./application/update-task-status");
const tasks_controller_1 = require("./infrastructure/controllers/tasks.controller");
const task_orm_entity_1 = require("./infrastructure/repositories/task.orm-entity");
const typeorm_tasks_repository_1 = require("./infrastructure/repositories/typeorm-tasks.repository");
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([task_orm_entity_1.TaskOrmEntity])],
        controllers: [tasks_controller_1.TasksController],
        providers: [
            create_task_1.CreateTask,
            list_tasks_1.ListTasks,
            get_task_1.GetTask,
            update_task_status_1.UpdateTaskStatus,
            delete_task_1.DeleteTask,
            {
                provide: tasks_repository_1.TASKS_REPOSITORY,
                useClass: typeorm_tasks_repository_1.TypeormTasksRepository,
            },
        ],
        exports: [create_task_1.CreateTask, list_tasks_1.ListTasks, get_task_1.GetTask, update_task_status_1.UpdateTaskStatus, delete_task_1.DeleteTask],
    })
], TasksModule);
//# sourceMappingURL=tasks.module.js.map