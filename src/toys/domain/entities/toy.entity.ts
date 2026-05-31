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

export class ToyEntity {
    readonly id: string;
    readonly price: number;
    readonly brand: string;
    readonly model: string;
    readonly color: string;
    readonly age: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(props: ToyEntityProps) {
        this.id = props.id;
        this.price = props.price;
        this.brand = props.brand;
        this.model = props.model;
        this.color = props.color;
        this.age = props.age;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
