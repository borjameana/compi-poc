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
var CreateToy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateToy = void 0;
const common_1 = require("@nestjs/common");
const toys_repository_1 = require("./toys.repository");
let CreateToy = CreateToy_1 = class CreateToy {
    constructor(toysRepository) {
        this.toysRepository = toysRepository;
        this.logger = new common_1.Logger(CreateToy_1.name);
    }
    async call(input) {
        this.logger.log('Creating toy', {
            brand: input.brand,
            model: input.model,
            color: input.color,
            price: input.price,
            age: input.age,
        });
        return this.toysRepository.create(input);
    }
};
exports.CreateToy = CreateToy;
exports.CreateToy = CreateToy = CreateToy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(toys_repository_1.TOYS_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateToy);
//# sourceMappingURL=create-toy.js.map