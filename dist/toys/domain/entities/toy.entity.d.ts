export type ToyEntityProps = {
    id: string;
    price: number;
    brand: string;
    model: string;
    color: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
};
export declare class ToyEntity {
    readonly id: string;
    readonly price: number;
    readonly brand: string;
    readonly model: string;
    readonly color: string;
    readonly age: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(props: ToyEntityProps);
}
