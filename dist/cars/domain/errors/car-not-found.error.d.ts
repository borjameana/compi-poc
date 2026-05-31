export declare class CarNotFoundError extends Error {
    readonly code = "CAR_NOT_FOUND";
    constructor(carId: string);
}
