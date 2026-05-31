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
exports.CarsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_car_1 = require("../../application/create-car");
const delete_car_1 = require("../../application/delete-car");
const get_car_1 = require("../../application/get-car");
const list_cars_1 = require("../../application/list-cars");
const update_car_1 = require("../../application/update-car");
const car_not_found_error_1 = require("../../domain/errors/car-not-found.error");
const car_response_dto_1 = require("../dtos/car-response.dto");
const create_car_dto_1 = require("../dtos/create-car.dto");
const update_car_dto_1 = require("../dtos/update-car.dto");
let CarsController = class CarsController {
    constructor(createCar, deleteCar, getCar, listCars, updateCar) {
        this.createCar = createCar;
        this.deleteCar = deleteCar;
        this.getCar = getCar;
        this.listCars = listCars;
        this.updateCar = updateCar;
    }
    async create(dto) {
        const car = await this.createCar.call(dto);
        return car_response_dto_1.CarResponseDto.from(car);
    }
    async findAll() {
        const cars = await this.listCars.call();
        return cars.map((car) => car_response_dto_1.CarResponseDto.from(car));
    }
    async findOne(id) {
        try {
            const car = await this.getCar.call(id);
            return car_response_dto_1.CarResponseDto.from(car);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    async update(id, dto) {
        try {
            const car = await this.updateCar.call(id, dto);
            return car_response_dto_1.CarResponseDto.from(car);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.deleteCar.call(id);
        }
        catch (error) {
            this.throwIfNotFound(error);
            throw error;
        }
    }
    throwIfNotFound(error) {
        if (error instanceof car_not_found_error_1.CarNotFoundError) {
            throw new common_1.NotFoundException(error.message);
        }
    }
};
exports.CarsController = CarsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Created' }),
    (0, swagger_1.ApiBody)({ type: create_car_dto_1.CreateCarDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Car not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'OK' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Car not found' }),
    (0, swagger_1.ApiBody)({ type: update_car_dto_1.UpdateCarDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'Deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Car not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "remove", null);
exports.CarsController = CarsController = __decorate([
    (0, swagger_1.ApiTags)('cars'),
    (0, common_1.Controller)('cars'),
    __metadata("design:paramtypes", [create_car_1.CreateCar,
        delete_car_1.DeleteCar,
        get_car_1.GetCar,
        list_cars_1.ListCars,
        update_car_1.UpdateCar])
], CarsController);
//# sourceMappingURL=cars.controller.js.map