export class ToyNotFoundError extends Error {
    readonly code = 'TOY_NOT_FOUND';

    constructor(toyId: string) {
        super(`Toy not found: ${toyId}`);
    }
}
