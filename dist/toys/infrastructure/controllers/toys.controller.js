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
exports.ToysController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_toy_1 = require("../../application/create-toy");
const delete_toy_1 = require("../../application/delete-toy");
const get_toy_1 = require("../../application/get-toy");
const list_toys_1 = require("../../application/list-toys");
const update_toy_1 = require("../../application/update-toy");
const toy_not_found_error_1 = require("../../domain/errors/toy-not-found.error");
const create_toy_dto_1 = require("../dtos/create-toy.dto");
const toy_response_dto_1 = require("../dtos/toy-response.dto");
const update_toy_dto_1 = require("../dtos/update-toy.dto");
let ToysController = class ToysController {
    constructor(createToy, deleteToy, getToy, listToys, updateToy) {
        this.createToy = createToy;
        this.deleteToy = deleteToy;
        this.getToy = getToy;
        this.listToys = listToys;
        this.updateToy = updateToy;
    }
    async create(dto) {
        const toy = await this.createToy.call(dto);
        return toy_response_dto_1.ToyResponseDto.from(toy);
    }
    async findAll() {
        const toys = await this.listToys.call();
        return toys.map((toy) => toy_response_dto_1.ToyResponseDto.from(toy));
    }
    async findOne(id) {
        try {
            const toy = await this.getToy.call(id);
            return toy_response_dto_1.ToyResponseDto.from(toy);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    async update(id, dto) {
        try {
            const toy = await this.updateToy.call(id, dto);
            return toy_response_dto_1.ToyResponseDto.from(toy);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.deleteToy.call(id);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    throwIfNotFound(error) {
        if (error instanceof toy_not_found_error_1.ToyNotFoundError) {
            throw new common_1.NotFoundException(error.message);
        }
    }
};
exports.ToysController = ToysController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Created' }),
    (0, swagger_1.ApiBody)({ type: create_toy_dto_1.CreateToyDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_toy_dto_1.CreateToyDto]),
    __metadata("design:returntype", Promise)
], ToysController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ToysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Toy not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToysController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Toy not found' }),
    (0, swagger_1.ApiBody)({ type: update_toy_dto_1.UpdateToyDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_toy_dto_1.UpdateToyDto]),
    __metadata("design:returntype", Promise)
], ToysController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Toy not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ToysController.prototype, "remove", null);
exports.ToysController = ToysController = __decorate([
    (0, swagger_1.ApiTags)('toys'),
    (0, common_1.Controller)('toys'),
    __metadata("design:paramtypes", [create_toy_1.CreateToy,
        delete_toy_1.DeleteToy,
        get_toy_1.GetToy,
        list_toys_1.ListToys,
        update_toy_1.UpdateToy])
], ToysController);
//# sourceMappingURL=toys.controller.js.map