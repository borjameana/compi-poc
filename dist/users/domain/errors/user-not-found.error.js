"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User not found: ${userId}`);
        this.code = 'USER_NOT_FOUND';
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=user-not-found.error.js.map