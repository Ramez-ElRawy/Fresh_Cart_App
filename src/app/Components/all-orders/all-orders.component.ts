import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/Interfaces/iorder';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit,OnDestroy{

  allOrders!:IOrder[];
  userId:string|null = '';
  getUserOrdersSubscribtion!:Subscription;

  constructor(private _CartService:CartService , private _AuthService:AuthService){}
  
  ngOnInit(): void {
    this._AuthService.userIDSubject.subscribe({
      next:(response)=>{
        console.log(response);
        // this.userId = response
        this.userId = response
        console.log(this.userId);
      }
    })
    console.log('test'+ this.userId);
    
    this.getUserOrdersSubscribtion = this._CartService.getUserOrders(this.userId).subscribe({
      next:(response)=>{
        console.log(response);
        this.allOrders = response
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    // this.getUserOrdersSubscribtion.unsubscribe();
  }

}
