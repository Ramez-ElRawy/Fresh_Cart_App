import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit , OnDestroy{

  wishedProductList:IProduct[] = [];
  wishedProductIdList:string[] = [];
  loadingScreen:boolean = false;
  getLoggedUserWishlistSubscribtion!:Subscription;
  removeProductFromWishListSubscribtion!:Subscription;
  addProductToCartSubscribtion!:Subscription;

  constructor(private _WishListService:WishListService , private _CartService:CartService , private _ToastrService:ToastrService){}

  ngOnInit(): void {
    // this._WishListService.loadingScreen.next(true);
    this.loadingScreen = true;
    this._WishListService.getLoggedUserWishlist().subscribe({
      next:(response)=>{
        // Unmapped array
        console.log(response.data);
        this.wishedProductList = response.data;
        this.loadingScreen = false;
        // this._WishListService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      }
    })
  }

  handleRemoveProductFromWishList(id:string)
  {
    // this._WishListService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.removeProductFromWishListSubscribtion = this._WishListService.removeProductFromWishList(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._WishListService.productsWishList.next(response.data);
        this._WishListService.wishListItemsNum.next(response.data.length)
        this._ToastrService.error("Product Removed Successfully From Wish List ❤️",'Remove Product');
        this.wishedProductIdList = response.data;

        this._WishListService.getLoggedUserWishlist().subscribe({
          next:(response)=>{
            this.wishedProductList = response.data
            this.loadingScreen = false;
            // this._WishListService.loadingScreen.next(false);
          }
        });
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      }
    })
  }

  handleAddProductToCart(id:string)
  {
    // this._CartService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.addProductToCartSubscribtion = this._CartService.addProductToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success("Product Added Successfully To Cart 🛒",'Add Product');
        this._CartService.cartItemsNum.next(response.numOfCartItems);
        this.handleRemoveProductFromWishList(id);
        this.loadingScreen = false;
        // this._CartService.loadingScreen.next(false);
      },
      error:(err)=>{
        console.log(err);
        this.loadingScreen = false;
      }
    })
  }

  ngOnDestroy(): void {
    // this.getLoggedUserWishlistSubscribtion.unsubscribe();
    // this.removeProductFromWishListSubscribtion.unsubscribe();
    // this.addProductToCartSubscribtion.unsubscribe();
  }

}
