"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToyResponseDto = void 0;
class ToyResponseDto {
    static from(entity) {
        return {
            id: entity.id,
            price: entity.price,
            brand: entity.brand,
            model: entity.model,
            color: entity.color,
            age: entity.age,
        };
    }
}
exports.ToyResponseDto = ToyResponseDto;
//# sourceMappingURL=toy-response.dto.js.map