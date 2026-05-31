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
var GetToy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetToy = void 0;
const common_1 = require("@nestjs/common");
const toys_repository_1 = require("./toys.repository");
const toy_not_found_error_1 = require("../domain/errors/toy-not-found.error");
let GetToy = GetToy_1 = class GetToy {
    constructor(toysRepository) {
        this.toysRepository = toysRepository;
        this.logger = new common_1.Logger(GetToy_1.name);
    }
    async call(id) {
        this.logger.log('Fetching toy', { id });
        const toy = await this.toysRepository.findById(id);
        if (!toy) {
            this.logger.warn('Toy not found', { id });
            throw new toy_not_found_error_1.ToyNotFoundError(id);
        }
        return toy;
    }
};
exports.GetToy = GetToy;
exports.GetToy = GetToy = GetToy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(toys_repository_1.TOYS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], GetToy);
//# sourceMappingURL=get-toy.js.map