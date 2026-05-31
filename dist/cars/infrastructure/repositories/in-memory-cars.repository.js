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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCarsRepository = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const car_entity_1 = require("../../domain/entities/car.entity");
let InMemoryCarsRepository = class InMemoryCarsRepository {
    constructor() {
        this.cars = [];
        const now = new Date();
        this.cars = [
            new car_entity_1.CarEntity({
                id: (0, node_crypto_1.randomUUID)(),
                plate: '1234-ABC',
                brand: 'Toyota',
                model: 'Corolla',
                year: 2020,
                createdAt: now,
                updatedAt: now,
            }),
            new car_entity_1.CarEntity({
                id: (0, node_crypto_1.randomUUID)(),
                plate: '5678-DEF',
                brand: 'Seat',
                model: 'Leon',
                year: 2019,
                createdAt: now,
                updatedAt: now,
            }),
            new car_entity_1.CarEntity({
                id: (0, node_crypto_1.randomUUID)(),
                plate: '9012-GHI',
                brand: 'Tesla',
                model: 'Model 3',
                year: 2022,
                createdAt: now,
                updatedAt: now,
            }),
        ];
    }
    async findAll() {
        return [...this.cars];
    }
    async findById(id) {
        return this.cars.find((car) => car.id === id) || null;
    }
    async create(input) {
        const now = new Date();
        const car = new car_entity_1.CarEntity({
            id: (0, node_crypto_1.randomUUID)(),
            plate: input.plate,
            brand: input.brand,
            model: input.model,
            year: input.year,
            createdAt: now,
            updatedAt: now,
        });
        this.cars = [...this.cars, car];
        return car;
    }
    async update(id, input) {
        const index = this.cars.findIndex((car) => car.id === id);
        if (index === -1) {
            return null;
        }
        const current = this.cars[index];
        const updated = new car_entity_1.CarEntity({
            id: current.id,
            plate: input.plate ?? current.plate,
            brand: input.brand ?? current.brand,
            model: input.model ?? current.model,
            year: input.year ?? current.year,
            createdAt: current.createdAt,
            updatedAt: new Date(),
        });
        this.cars[index] = updated;
        return updated;
    }
    async delete(id) {
        const index = this.cars.findIndex((car) => car.id === id);
        if (index === -1) {
            return false;
        }
        this.cars.splice(index, 1);
        return true;
    }
};
exports.InMemoryCarsRepository = InMemoryCarsRepository;
exports.InMemoryCarsRepository = InMemoryCarsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryCarsRepository);
//# sourceMappingURL=in-memory-cars.repository.js.map