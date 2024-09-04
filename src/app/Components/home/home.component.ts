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
  totalPagesNumber!:number;
  currentPageNumber:number = 1;
  getAllProductsSubscribtion!:Subscription;


  constructor(private _ProductService:ProductService , private _productService:ProductService, private _WishListService:WishListService){}
  
  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(){
    this.loadingScreen = true;
    this.getAllProductsSubscribtion = this._ProductService.getAllProducts(20,this.currentPageNumber).subscribe({
      next:(response)=>{
        console.log(response);
        this.totalPagesNumber = response.metadata.numberOfPages;
        this.currentPageNumber = response.metadata.currentPage;

        this.allProducts = response.data;
        this.loadingScreen = false;
        console.log(this.allProducts);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      },
    })
  }

  previousPage(){
    console.log('previousPage');
    if (this.currentPageNumber > 1) {
      console.log('valid');
      this.currentPageNumber--;
      this.getProductsData();
    }
    else{
      console.log('invalid');
    }
  }

  nextPage(){
    console.log('nextPage');
    if (this.currentPageNumber < this.totalPagesNumber) {
      console.log('valid');
      this.currentPageNumber++;
      this.getProductsData();
    }
    else{
      console.log('invalid');
    }
  }

  ngOnDestroy(): void {
    this.getAllProductsSubscribtion.unsubscribe();
  }
}
