"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = void 0;
class TaskEntity {
    constructor(props) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.priority = props.priority;
        this.status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }
}
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=task.entity.js.map