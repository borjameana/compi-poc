export type CarEntityProps = {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
};
export declare class CarEntity {
    readonly id: string;
    readonly plate: string;
    readonly brand: string;
    readonly model: string;
    readonly year: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(props: CarEntityProps);
}
