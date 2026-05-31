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
exports.InMemoryUsersRepository = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const user_entity_1 = require("../../domain/entities/user.entity");
let InMemoryUsersRepository = class InMemoryUsersRepository {
    constructor() {
        this.users = [];
        const now = new Date();
        this.users = [
            new user_entity_1.UserEntity({
                id: (0, node_crypto_1.randomUUID)(),
                name: 'Ana',
                surname: 'Ruiz',
                age: 32,
                country: 'ES',
                createdAt: now,
                updatedAt: now,
            }),
            new user_entity_1.UserEntity({
                id: (0, node_crypto_1.randomUUID)(),
                name: 'Luis',
                surname: 'Martinez',
                age: 41,
                country: 'ES',
                createdAt: now,
                updatedAt: now,
            }),
            new user_entity_1.UserEntity({
                id: (0, node_crypto_1.randomUUID)(),
                name: 'Marta',
                surname: 'Lopez',
                age: 27,
                country: 'PT',
                createdAt: now,
                updatedAt: now,
            }),
        ];
    }
    async findAll() {
        return [...this.users];
    }
    async findById(id) {
        return this.users.find((user) => user.id === id) || null;
    }
    async create(input) {
        const now = new Date();
        const user = new user_entity_1.UserEntity({
            id: (0, node_crypto_1.randomUUID)(),
            name: input.name,
            surname: input.surname,
            age: input.age,
            country: input.country,
            createdAt: now,
            updatedAt: now,
        });
        this.users = [...this.users, user];
        return user;
    }
    async update(id, input) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return null;
        }
        const current = this.users[index];
        const updated = new user_entity_1.UserEntity({
            id: current.id,
            name: input.name ?? current.name,
            surname: input.surname ?? current.surname,
            age: input.age ?? current.age,
            country: input.country ?? current.country,
            createdAt: current.createdAt,
            updatedAt: new Date(),
        });
        this.users[index] = updated;
        return updated;
    }
    async delete(id) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }
};
exports.InMemoryUsersRepository = InMemoryUsersRepository;
exports.InMemoryUsersRepository = InMemoryUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryUsersRepository);
//# sourceMappingURL=in-memory-users.repository.js.map