"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const create_user_1 = require("./application/create-user");
const delete_user_1 = require("./application/delete-user");
const get_user_1 = require("./application/get-user");
const list_users_1 = require("./application/list-users");
const update_user_1 = require("./application/update-user");
const users_repository_1 = require("./application/users.repository");
const users_controller_1 = require("./infrastructure/controllers/users.controller");
const in_memory_users_repository_1 = require("./infrastructure/repositories/in-memory-users.repository");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [
            create_user_1.CreateUser,
            delete_user_1.DeleteUser,
            get_user_1.GetUser,
            list_users_1.ListUsers,
            update_user_1.UpdateUser,
            {
                provide: users_repository_1.USERS_REPOSITORY,
                useClass: in_memory_users_repository_1.InMemoryUsersRepository,
            },
        ],
        exports: [create_user_1.CreateUser, delete_user_1.DeleteUser, get_user_1.GetUser, list_users_1.ListUsers, update_user_1.UpdateUser],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map