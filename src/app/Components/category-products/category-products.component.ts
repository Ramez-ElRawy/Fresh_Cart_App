import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  loadingScreen:boolean = false;
  categoryProductList:IProduct[] = []
  categoryId:string|null = '';

  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService){}
  
  ngOnInit(): void {
    this.loadingScreen = true;
    this._ActivatedRoute.paramMap.subscribe((params)=>{this.categoryId = params.get('categoryId')})
    this._ProductService.getCategoryProducts(this.categoryId).subscribe({
      next:(response)=>{
        console.log(response.data);
        this.loadingScreen = false;
        this.categoryProductList = response.data;
      }
    })
  }



}
