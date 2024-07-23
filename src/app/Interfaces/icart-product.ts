import { IProduct } from "./iproduct";

export interface ICartProduct {
    count:number;
    price:number;
    product:IProduct;
    _id:string;
}
