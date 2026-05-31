"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarResponseDto = void 0;
class CarResponseDto {
    static from(entity) {
        return {
            id: entity.id,
            plate: entity.plate,
            brand: entity.brand,
            model: entity.model,
            year: entity.year,
        };
    }
}
exports.CarResponseDto = CarResponseDto;
//# sourceMappingURL=car-response.dto.js.map