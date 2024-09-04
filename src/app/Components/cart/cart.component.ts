import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICart } from 'src/app/Interfaces/icart';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit , OnDestroy{
  
  userCart!:ICart;
  loadingScreen:boolean = false;
  getLoggedUserCartSubscribtion!:Subscription;
  removeCartItemSubscribtion!:Subscription;
  updateCartProductQuantitySubscribtion!:Subscription;
  
  constructor(private _CartService:CartService , private _Router:Router , private _ToastrService:ToastrService){}
  
  ngOnInit(): void {
    // this._CartService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.getLoggedUserCartSubscribtion = this._CartService.getLoggedUserCart().subscribe({
      next:(response)=>{
        console.log(response);
        this.userCart = response.data;
        this.loadingScreen = false;
        // this._CartService.loadingScreen.next(false);

        console.log(this.getLoggedUserCartSubscribtion);
        console.log(this.removeCartItemSubscribtion);
        console.log(this.updateCartProductQuantitySubscribtion);
        
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      },
    })
  }

  handleRemoveCartItem(id:any)
  {
    // this._CartService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.removeCartItemSubscribtion = this._CartService.removeCartItem(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.error("Product Removed Successfully From Cart 🛒",'Remove Product');
        this.userCart = response.data;
        this._CartService.cartItemsNum.next(response.numOfCartItems)
        this.loadingScreen = false;
        // this._CartService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      },
    })
  }

  handleUpdateCartProductQuantity(id:string,count:number)
  {
    if (count>0) {
      // this._CartService.loadingScreen.next(true);
      this.loadingScreen = true;
      this.updateCartProductQuantitySubscribtion = this._CartService.updateCartProductQuantity(id,count).subscribe({
        next:(response)=>{
          console.log(response);
          // Add Toaster
          this.userCart = response.data;
          this.loadingScreen = false;
          // this._CartService.loadingScreen.next(false);
        },
        error:(err)=>{console.log(err);
          this.loadingScreen = false;
        }
      })
    }
  }

  handleClearUserCart()
  {
    // this._CartService.loadingScreen.next(true);
    this.loadingScreen = true;
    this._CartService.clearUserCart().subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.error("Cart Has Been Cleared Successfully 🛒",'Clear Cart');
        this._CartService.cartItemsNum.next(0);
        this._Router.navigate(['/home'])
        this.loadingScreen = false;
        // this._CartService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.getLoggedUserCartSubscribtion.unsubscribe();
    if (this.removeCartItemSubscribtion) {
      this.removeCartItemSubscribtion.unsubscribe();
    }
    if (this.updateCartProductQuantitySubscribtion) {
      this.updateCartProductQuantitySubscribtion.unsubscribe();
    }
  }
}
