import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { WishListService } from 'src/app/Services/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit , OnDestroy {
  
  @Input() product!:IProduct;
  @Input() wished!:boolean;
  wishedProductsList:string[] = [];
  addProductToCartSubscribtion!:Subscription;
  addProductToWishListSubscribtion!:Subscription;
  removeProductFromWishListSubscribtion!:Subscription;
  wishedProduct:any;

  constructor(private _CartService:CartService , private _WishListService:WishListService , private _ToastrService:ToastrService){}

  ngOnInit(): void {

    // this._WishListService.getLoggedUserWishlist().subscribe({
    //   next:(response)=>{
    //     console.log(response);
    //     let wishedProduct = response.data;
    //     if(wishedProduct)
    //     {
    //       this.wishedProductsList = wishedProduct.map((product:any)=>{return product._id});
    //       console.log(this.wishedProductsList);
    //     }
    //   }
    // })

    this._WishListService.productsWishList.subscribe({
      next:(response)=>{
        console.log(response);
        this.wishedProductsList = response;
      }
    })

  }

  handleAddProductToCart(id:any){
    // this._CartService.loadingScreen.next(true);
    this.addProductToCartSubscribtion = this._CartService.addProductToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success("Product Added Successfully To Cart 🛒",'Success');
        this._CartService.cartItemsNum.next(response.numOfCartItems)
        // this._CartService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
      },
    })
  }

  handleAddProductToWishList(id:string)
  {

    // this._WishListService.addProductToWishList(id).subscribe({
    //   next:(response)=>{
    //     console.log(response);
    //     this._ToastrService.success("Product Added Successfully To Wish List ❤️",'Success');
    //     this._WishListService.productsWishList.next(response.data);
    //   },
    //   error:(err)=>{console.log(err);
    //   }
    // })

    if (this.isWishedProduct(id)) {
      this.removeProductFromWishListSubscribtion = this._WishListService.removeProductFromWishList(id).subscribe({
        next:(response)=>{
          console.log(response);
          this._WishListService.wishListItemsNum.next(response.data.length)
          this._WishListService.productsWishList.next(response.data);
          this._ToastrService.error("Product Removed Successfully From Wish List ❤️",'Remove Product');
          this.wishedProductsList = response.data;
        }
      })
    }
    else{
      this.addProductToWishListSubscribtion = this._WishListService.addProductToWishList(id).subscribe({
        next:(response)=>{
          console.log(response);
          this._WishListService.wishListItemsNum.next(response.data.length);
          this._WishListService.productsWishList.next(response.data);
          this._ToastrService.success("Product Added Successfully To Wish List ❤️",'Success');
          this.wishedProductsList = response.data;
        },
        error:(err)=>{console.log(err);
        }
      })
    }

  }

  isWishedProduct(id:string):boolean
  {
    return this.wishedProductsList.includes(id) ? true : false;
  }

  ngOnDestroy(): void {
    // this.addProductToCartSubscribtion.unsubscribe();
    // this.addProductToWishListSubscribtion.unsubscribe();
    // this.removeProductFromWishListSubscribtion.unsubscribe();
  }
  
}
