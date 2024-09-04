import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy{

  allProducts:IProduct[] = [];
  searchTerm:string = '';
  loadingScreen:boolean = false;
  currentPageNumber:number = 1;
  
  getAllProductsSubscribtion!:Subscription;

  constructor(private _ProductService:ProductService){}
  
  ngOnInit(): void {
    // this._ProductService.loadingScreen.next(true);
    this.loadingScreen = true
    this.getAllProductsSubscribtion = this._ProductService.getAllProducts(20,this.currentPageNumber).subscribe({
      next:(response)=>{
        console.log(response);
        
        this.allProducts = response.data
        this.loadingScreen = false
        // this._ProductService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false
      }
    })
  }

  ngOnDestroy(): void {
    // this.getAllProductsSubscribtion.unsubscribe();
  }
  
}
