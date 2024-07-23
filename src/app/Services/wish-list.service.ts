import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishListItemsNum = new BehaviorSubject<number>(0);
  productsWishList = new BehaviorSubject<string[]>([]);
  loadingScreen = new BehaviorSubject<boolean>(false);

  constructor(private _HttpClient:HttpClient) { 
    this.getLoggedUserWishlist().subscribe({
      next:(response)=>{
        console.log(response);
        this.wishListItemsNum.next(response.count);
        let wishedProduct = response.data;
        if(wishedProduct)
        {
          this.productsWishList.next(wishedProduct.map((product:any)=>{return product._id}));
        }
      }
    })
  }

  addProductToWishList(id:string):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId : id
      }
    );
  }

  getLoggedUserWishlist():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }

  removeProductFromWishList(id:string):Observable<any>
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }
}
