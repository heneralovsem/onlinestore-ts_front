export interface IUser {
    id?: number;
    email?:string;
    password?:string;
    role?:string;
}
export interface IType {
    id?: number;
    name?:string;
}
export interface IBrand {
    id?: number;
    name?:string;
}
export interface IDeviceInfo {
    id?:number;
    title?: string;
    description?: string;
}
export interface IDevice {
    id?: number;
    name?: string;
    price?: number;
    rating?: number;
    img?: string;
    typeId?:number;
    brandId?:number;
    info?: IDeviceInfo[]
}
export interface IBasketDevice {
    id?: number;
    deviceId?: number;
    basketId?:number;
    price?: number;
}
export interface IReview {
    id?: number;
    deviceId?: number;
    rating?: number;
    date?: string
    text?: string;
    userId?: number;
}
export interface IOrderedDevice {
    id: number;
    deviceId: number;
    orderId: number;
}
export interface IOrder {
    id?: number;
    createdAt?: string;
    userName?: string;
    userPhone?: string;
    userEmail?: string;
    totalPrice?: number;
    devices?: IOrderedDevice[]
    userId?: number;
}