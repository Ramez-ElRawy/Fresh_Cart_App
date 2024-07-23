import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.css']
})
export class BrandProductsComponent implements OnInit {

  brandId:string|null = '';
  brandProductList:IProduct[] = [];
  loadingScreen:boolean = false;

  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService){}

  ngOnInit(): void {
    this.loadingScreen = true;
    this._ActivatedRoute.paramMap.subscribe((param)=>{this.brandId = param.get('brandId')})
    this._ProductService.getBrandProducts(this.brandId).subscribe({
      next:(response)=>{
        console.log(response);
        this.brandProductList = response.data;
        this.loadingScreen = false;
      },
      error:(err)=>{
        console.log(err);
        this.loadingScreen = false;
      }
    })
  }
}
