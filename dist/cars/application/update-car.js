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
var UpdateCar_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCar = void 0;
const common_1 = require("@nestjs/common");
const cars_repository_1 = require("./cars.repository");
const car_not_found_error_1 = require("../domain/errors/car-not-found.error");
let UpdateCar = UpdateCar_1 = class UpdateCar {
    constructor(carsRepository) {
        this.carsRepository = carsRepository;
        this.logger = new common_1.Logger(UpdateCar_1.name);
    }
    async call(id, input) {
        this.logger.log('Updating car', { id, input });
        const car = await this.carsRepository.update(id, input);
        if (!car) {
            this.logger.warn('Car not found', { id });
            throw new car_not_found_error_1.CarNotFoundError(id);
        }
        return car;
    }
};
exports.UpdateCar = UpdateCar;
exports.UpdateCar = UpdateCar = UpdateCar_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cars_repository_1.CARS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateCar);
//# sourceMappingURL=update-car.js.map