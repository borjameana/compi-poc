"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ListTasks_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTasks = void 0;
const common_1 = require("@nestjs/common");
const tasks_repository_1 = require("./tasks.repository");
let ListTasks = ListTasks_1 = class ListTasks {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
        this.logger = new common_1.Logger(ListTasks_1.name);
    }
    async call(filters) {
        this.logger.log('Listing tasks', filters);
        return this.tasksRepository.findAll(filters);
    }
};
exports.ListTasks = ListTasks;
exports.ListTasks = ListTasks = ListTasks_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tasks_repository_1.TASKS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ListTasks);
//# sourceMappingURL=list-tasks.js.map