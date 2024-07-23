import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedUser = false;
  numOfCartItems:number = 0;
  numOfWishListItems:number = 0;

  constructor(private _AuthService:AuthService , private _CartService:CartService , private _WishListService:WishListService){}
  
  ngOnInit(): void {
    this._AuthService.isLoggedSubject.subscribe((isLogged)=>{this.isLoggedUser = isLogged});
    this._CartService.cartItemsNum.subscribe({
      next:(response)=>{this.numOfCartItems = response}
    })
    this._WishListService.wishListItemsNum.subscribe((response)=>{this.numOfWishListItems = response;
      console.log(response);
      
    })
  }

  logOut()
  {
    this._AuthService.logOut()
  }
}
