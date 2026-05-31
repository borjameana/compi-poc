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
var DeleteToy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteToy = void 0;
const common_1 = require("@nestjs/common");
const toys_repository_1 = require("./toys.repository");
const toy_not_found_error_1 = require("../domain/errors/toy-not-found.error");
let DeleteToy = DeleteToy_1 = class DeleteToy {
    constructor(toysRepository) {
        this.toysRepository = toysRepository;
        this.logger = new common_1.Logger(DeleteToy_1.name);
    }
    async call(id) {
        this.logger.log('Deleting toy', { id });
        const removed = await this.toysRepository.delete(id);
        if (!removed) {
            this.logger.warn('Toy not found', { id });
            throw new toy_not_found_error_1.ToyNotFoundError(id);
        }
    }
};
exports.DeleteToy = DeleteToy;
exports.DeleteToy = DeleteToy = DeleteToy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(toys_repository_1.TOYS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DeleteToy);
//# sourceMappingURL=delete-toy.js.map