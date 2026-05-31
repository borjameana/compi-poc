export type CarEntityProps = {
    id: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
};

export class CarEntity {
    readonly id: string;
    readonly plate: string;
    readonly brand: string;
    readonly model: string;
    readonly year: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(props: CarEntityProps) {
        this.id = props.id;
        this.plate = props.plate;
        this.brand = props.brand;
        this.model = props.model;
        this.year = props.year;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
