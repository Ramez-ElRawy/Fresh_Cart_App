import { ICartItems } from "./icart-items";
import { IProduct } from "./iproduct";

export interface IOrder {
    cartItems:ICartItems[];
    createdAt:string;
    id:number;
    isDelivered:boolean;
    isPaid:boolean;
    paymentMethodType:string;
    shippingPrice:number;
    taxPrice:number;
    totalOrderPrice:number;
    user:string;
    _id:string;
}
