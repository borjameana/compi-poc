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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_1 = require("../../application/create-user");
const delete_user_1 = require("../../application/delete-user");
const get_user_1 = require("../../application/get-user");
const list_users_1 = require("../../application/list-users");
const update_user_1 = require("../../application/update-user");
const user_not_found_error_1 = require("../../domain/errors/user-not-found.error");
const create_user_dto_1 = require("../dtos/create-user.dto");
const update_user_dto_1 = require("../dtos/update-user.dto");
const user_response_dto_1 = require("../dtos/user-response.dto");
let UsersController = class UsersController {
    constructor(createUser, deleteUser, getUser, listUsers, updateUser) {
        this.createUser = createUser;
        this.deleteUser = deleteUser;
        this.getUser = getUser;
        this.listUsers = listUsers;
        this.updateUser = updateUser;
    }
    async create(dto) {
        const user = await this.createUser.call(dto);
        return user_response_dto_1.UserResponseDto.from(user);
    }
    async findAll() {
        const users = await this.listUsers.call();
        return users.map((user) => user_response_dto_1.UserResponseDto.from(user));
    }
    async findOne(id) {
        try {
            const user = await this.getUser.call(id);
            return user_response_dto_1.UserResponseDto.from(user);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    async update(id, dto) {
        try {
            const user = await this.updateUser.call(id, dto);
            return user_response_dto_1.UserResponseDto.from(user);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.deleteUser.call(id);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    throwIfNotFound(error) {
        if (error instanceof user_not_found_error_1.UserNotFoundError) {
            throw new common_1.NotFoundException(error.message);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Created' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [create_user_1.CreateUser,
        delete_user_1.DeleteUser,
        get_user_1.GetUser,
        list_users_1.ListUsers,
        update_user_1.UpdateUser])
], UsersController);
//# sourceMappingURL=users.controller.js.map