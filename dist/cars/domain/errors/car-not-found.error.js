"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarNotFoundError = void 0;
class CarNotFoundError extends Error {
    constructor(carId) {
        super(`Car not found: ${carId}`);
        this.code = 'CAR_NOT_FOUND';
    }
}
exports.CarNotFoundError = CarNotFoundError;
//# sourceMappingURL=car-not-found.error.js.map