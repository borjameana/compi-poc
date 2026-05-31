export type UserEntityProps = {
    id: string;
    name: string;
    surname: string;
    age: number;
    country: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare class UserEntity {
    readonly id: string;
    readonly name: string;
    readonly surname: string;
    readonly age: number;
    readonly country: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(props: UserEntityProps);
}
