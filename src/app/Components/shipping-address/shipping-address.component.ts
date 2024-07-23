import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/Interfaces/iorder';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit ,OnDestroy {

  cartId:string|null = '';
  paymentType:string = 'cash';
  loadingScreen:boolean = false;
  cashPaymentSubscribtion!:Subscription;
  onlinePaymentSubscribtion!:Subscription;

  constructor(private _CartService:CartService , private _ActivatedRoute:ActivatedRoute , private _Router:Router){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{this.cartId = params.get('cartId')})
  }

  shippingAddressForm:FormGroup = new FormGroup({
    details: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,Validators.pattern(/^(02)?01[0125][0-9]{8}$/)),
    city: new FormControl(null,Validators.required)
  })

  handleShippingAddress(shippingAddressForm:FormGroup)
  {
    // this._CartService.loadingScreen.next(true);
    this.loadingScreen = true;
    //switch case    [cash - onine]
    switch (this.paymentType) {
      case 'cash':
        this.cashPaymentSubscribtion = this._CartService.cashPayment(this.cartId , shippingAddressForm.value).subscribe({
          next:(response)=>{
            console.log(response);
            this._CartService.order = response.data;
            this._CartService.cartItemsNum.next(0)
            this._Router.navigate(['/orderDetails']);
            this.loadingScreen = false;
            // this._CartService.loadingScreen.next(false);
          },
          error:(err)=>{
            console.log(err);
            this.loadingScreen = false;
          },
        })
        break;

      case 'online':
        this.onlinePaymentSubscribtion = this._CartService.onlinePayment(this.cartId , shippingAddressForm.value).subscribe({
          next:(response)=>{
            console.log(response);
            // this._CartService.loadingScreen.next(false);
            window.location.href = response.session.url;
            this.loadingScreen = false;
            this._CartService.clearUserCart().subscribe({
              next:()=>{
                this._CartService.cartItemsNum.next(0);
              }
            })
            
          },
          error:(err)=>{console.log(err);
            this.loadingScreen = false;
          }
        })
        break;
    
      default:
        break;
    }
    
  } 

  paymentChange(value:string)
  {
    this.paymentType = value;
  }

  ngOnDestroy(): void {
    // this.cashPaymentSubscribtion.unsubscribe();
    // this.onlinePaymentSubscribtion.unsubscribe();
  }
  
}
