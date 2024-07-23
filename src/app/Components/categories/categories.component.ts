import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/Interfaces/icategory';
import { ISubcategory } from 'src/app/Interfaces/isubcategory';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit , OnDestroy{

  allCategories:ICategory[] = [];
  subcategoriesOnCategory:ISubcategory[] = [];
  categoryTitle:string = '';
  loadingScreen:boolean = false;
  getAllCategoriesSubscribtion!:Subscription;
  getSpecificCategorySubscribtion!:Subscription;
  getAllSubcategoriesOnCategorySubscribtion!:Subscription;

  constructor(private _ProductService:ProductService){}

  ngOnInit(): void {
    // this._ProductService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.getAllCategoriesSubscribtion = this._ProductService.getAllCategories().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.allCategories = response.data;
        this.loadingScreen = false;
        // this._ProductService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
      },
    })
  }

  handleGetAllSubcategoriesOnCategory(id:string)
  {
    // this._ProductService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.getSpecificCategorySubscribtion = this._ProductService.getSpecificCategory(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.categoryTitle = response.data.name;
      },
      error:(err)=>{console.log(err);
      }
    })
    this.getAllSubcategoriesOnCategorySubscribtion = this._ProductService.getAllSubcategoriesOnCategory(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.subcategoriesOnCategory = response.data;
        this.loadingScreen = false;
        // this._ProductService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      },
    })
  }

  ngOnDestroy(): void {
    // this.getAllCategoriesSubscribtion.unsubscribe();
    // this.getSpecificCategorySubscribtion.unsubscribe();
    // this.getAllSubcategoriesOnCategorySubscribtion.unsubscribe();
  }
  
}
