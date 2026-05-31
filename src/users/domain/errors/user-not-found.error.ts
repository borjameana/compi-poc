export class UserNotFoundError extends Error {
    readonly code = 'USER_NOT_FOUND';

    constructor(userId: string) {
        super(`User not found: ${userId}`);
    }
}
