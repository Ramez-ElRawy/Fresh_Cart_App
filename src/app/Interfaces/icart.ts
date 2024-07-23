import { ICartProduct } from "./icart-product";

export interface ICart {
    products:ICartProduct[];
    totalCartPrice:number;
    _id:string;
    numOfCartItems:number;
}
