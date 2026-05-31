"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsModule = void 0;
const common_1 = require("@nestjs/common");
const create_car_1 = require("./application/create-car");
const delete_car_1 = require("./application/delete-car");
const get_car_1 = require("./application/get-car");
const list_cars_1 = require("./application/list-cars");
const update_car_1 = require("./application/update-car");
const cars_repository_1 = require("./application/cars.repository");
const cars_controller_1 = require("./infrastructure/controllers/cars.controller");
const in_memory_cars_repository_1 = require("./infrastructure/repositories/in-memory-cars.repository");
let CarsModule = class CarsModule {
};
exports.CarsModule = CarsModule;
exports.CarsModule = CarsModule = __decorate([
    (0, common_1.Module)({
        controllers: [cars_controller_1.CarsController],
        providers: [
            create_car_1.CreateCar,
            delete_car_1.DeleteCar,
            get_car_1.GetCar,
            list_cars_1.ListCars,
            update_car_1.UpdateCar,
            {
                provide: cars_repository_1.CARS_REPOSITORY,
                useClass: in_memory_cars_repository_1.InMemoryCarsRepository,
            },
        ],
        exports: [create_car_1.CreateCar, delete_car_1.DeleteCar, get_car_1.GetCar, list_cars_1.ListCars, update_car_1.UpdateCar],
    })
], CarsModule);
//# sourceMappingURL=cars.module.js.map