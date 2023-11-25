export interface IUser {
    userId: number;
    username: string;
    password: string;
    fullName: IName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: IAddress;
    orders?: IOrder[];
}

export interface IOrder {
    productName: string;
    price: number;
    quantity: number;
}

export interface IName {
    firstName: string;
    lastName: string;
}

export interface IAddress {
    street: string;
    city: string;
    country: string;
}