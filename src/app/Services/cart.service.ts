import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { IShippingAddressForm } from '../Interfaces/ishipping-address-form';
import { IOrder } from '../Interfaces/iorder';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemsNum = new BehaviorSubject<number>(0)
  loadingScreen = new BehaviorSubject<boolean>(false);
  order!:IOrder;

  constructor(private _HttpClient:HttpClient ) { 
    this.updateLoggedUserCartItemsCount();
  }

  updateLoggedUserCartItemsCount(){
    this.getLoggedUserCart().subscribe({
      next:(response)=>{this.cartItemsNum.next(response.numOfCartItems)},
      error:(err)=>{
        if(err.status == 404){
          this.cartItemsNum.next(0);
        }
      }
    });
  }

  addProductToCart(id:string):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId : id
      }
    )
  }

  getLoggedUserCart():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  removeCartItem(id:string):Observable<any>
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  updateCartProductQuantity(id:string,count:number):Observable<any>
  {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        "count": count
      }
    )
  }

  clearUserCart():Observable<any>
  {
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart')
  }

  // [Online - Cash] Payment Methods
  cashPayment(cartId:string|null , shippingAddressForm:IShippingAddressForm):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddressForm)
  }

  onlinePayment(cartId:string|null , shippingAddressForm:IShippingAddressForm):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,shippingAddressForm)
  }
  
  getUserOrders(userId:string|null):Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }
}
