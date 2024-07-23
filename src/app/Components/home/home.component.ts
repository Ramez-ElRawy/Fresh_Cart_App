import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/Interfaces/icategory';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { Recipe } from 'src/app/Interfaces/recipe';
import { NewsPaperService } from 'src/app/Services/news-paper.service';
import { ProductService } from 'src/app/Services/product.service';
import { RecipeService } from 'src/app/Services/recipe.service';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  allProducts:IProduct[] = [];
  searchTerm:string = '';
  wishedProductList:string[] = [];
  loadingScreen:boolean = false;
  getAllProductsSubscribtion!:Subscription;


  constructor(private _ProductService:ProductService , private _WishListService:WishListService){}
  
  ngOnInit(): void {
    // this._ProductService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.getAllProductsSubscribtion = this._ProductService.getAllProducts().subscribe({
      next:(response)=>{
        console.log(response);
        this.allProducts = response.data;
        this.loadingScreen = false;
        // this._ProductService.loadingScreen.next(false);
        console.log(this.allProducts);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      },
    })
  }

  ngOnDestroy(): void {
    // this.getAllProductsSubscribtion.unsubscribe();
  }
}
