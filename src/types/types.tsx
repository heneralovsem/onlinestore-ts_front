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
}
export interface IReview {
    id?: number;
    deviceId?: number;
    rating?: number;
    text?: string;
    userId?: number;
}