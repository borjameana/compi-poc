"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToyNotFoundError = void 0;
class ToyNotFoundError extends Error {
    constructor(toyId) {
        super(`Toy not found: ${toyId}`);
        this.code = 'TOY_NOT_FOUND';
    }
}
exports.ToyNotFoundError = ToyNotFoundError;
//# sourceMappingURL=toy-not-found.error.js.map