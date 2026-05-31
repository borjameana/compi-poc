export type UserEntityProps = {
    id: string;
    name: string;
    surname: string;
    age: number;
    country: string;
    createdAt: Date;
    updatedAt: Date;
};

export class UserEntity {
    readonly id: string;
    readonly name: string;
    readonly surname: string;
    readonly age: number;
    readonly country: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(props: UserEntityProps) {
        this.id = props.id;
        this.name = props.name;
        this.surname = props.surname;
        this.age = props.age;
        this.country = props.country;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
