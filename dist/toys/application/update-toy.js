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
var UpdateToy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateToy = void 0;
const common_1 = require("@nestjs/common");
const toys_repository_1 = require("./toys.repository");
const toy_not_found_error_1 = require("../domain/errors/toy-not-found.error");
let UpdateToy = UpdateToy_1 = class UpdateToy {
    constructor(toysRepository) {
        this.toysRepository = toysRepository;
        this.logger = new common_1.Logger(UpdateToy_1.name);
    }
    async call(id, input) {
        this.logger.log('Updating toy', { id, input });
        const toy = await this.toysRepository.update(id, input);
        if (!toy) {
            this.logger.warn('Toy not found', { id });
            throw new toy_not_found_error_1.ToyNotFoundError(id);
        }
        return toy;
    }
};
exports.UpdateToy = UpdateToy;
exports.UpdateToy = UpdateToy = UpdateToy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(toys_repository_1.TOYS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateToy);
//# sourceMappingURL=update-toy.js.map