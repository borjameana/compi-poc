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
exports.InMemoryToysRepository = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const toy_entity_1 = require("../../domain/entities/toy.entity");
let InMemoryToysRepository = class InMemoryToysRepository {
    constructor() {
        this.toys = [];
        const now = new Date();
        this.toys = [
            new toy_entity_1.ToyEntity({
                id: (0, node_crypto_1.randomUUID)(),
                price: 29.99,
                brand: 'LEGO',
                model: 'City Fire Truck',
                color: 'Red',
                age: 7,
                createdAt: now,
                updatedAt: now,
            }),
            new toy_entity_1.ToyEntity({
                id: (0, node_crypto_1.randomUUID)(),
                price: 14.5,
                brand: 'Hasbro',
                model: 'Play-Doh Set',
                color: 'Multi',
                age: 3,
                createdAt: now,
                updatedAt: now,
            }),
            new toy_entity_1.ToyEntity({
                id: (0, node_crypto_1.randomUUID)(),
                price: 9.99,
                brand: 'Mattel',
                model: 'Hot Wheels',
                color: 'Blue',
                age: 6,
                createdAt: now,
                updatedAt: now,
            }),
        ];
    }
    async findAll() {
        return [...this.toys];
    }
    async findById(id) {
        return this.toys.find((toy) => toy.id === id) || null;
    }
    async create(input) {
        const now = new Date();
        const toy = new toy_entity_1.ToyEntity({
            id: (0, node_crypto_1.randomUUID)(),
            price: input.price,
            brand: input.brand,
            model: input.model,
            color: input.color,
            age: input.age,
            createdAt: now,
            updatedAt: now,
        });
        this.toys = [...this.toys, toy];
        return toy;
    }
    async update(id, input) {
        const index = this.toys.findIndex((toy) => toy.id === id);
        if (index === -1) {
            return null;
        }
        const current = this.toys[index];
        const updated = new toy_entity_1.ToyEntity({
            id: current.id,
            price: input.price ?? current.price,
            brand: input.brand ?? current.brand,
            model: input.model ?? current.model,
            color: input.color ?? current.color,
            age: input.age ?? current.age,
            createdAt: current.createdAt,
            updatedAt: new Date(),
        });
        this.toys[index] = updated;
        return updated;
    }
    async delete(id) {
        const index = this.toys.findIndex((toy) => toy.id === id);
        if (index === -1) {
            return false;
        }
        this.toys.splice(index, 1);
        return true;
    }
};
exports.InMemoryToysRepository = InMemoryToysRepository;
exports.InMemoryToysRepository = InMemoryToysRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryToysRepository);
//# sourceMappingURL=in-memory-toys.repository.js.map