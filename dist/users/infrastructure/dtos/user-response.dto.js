"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
class UserResponseDto {
    static from(entity) {
        return {
            id: entity.id,
            name: entity.name,
            surname: entity.surname,
            age: entity.age,
            country: entity.country,
        };
    }
}
exports.UserResponseDto = UserResponseDto;
//# sourceMappingURL=user-response.dto.js.map