import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/Interfaces/iorder';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  userOrder!:IOrder;

  constructor(private _CartService:CartService){}
  
  ngOnInit(): void {
    this.userOrder =  this._CartService.order
  }
}
