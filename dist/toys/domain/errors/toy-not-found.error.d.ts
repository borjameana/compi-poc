export declare class ToyNotFoundError extends Error {
    readonly code = "TOY_NOT_FOUND";
    constructor(toyId: string);
}
