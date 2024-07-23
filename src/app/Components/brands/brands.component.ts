import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBrand } from 'src/app/Interfaces/ibrand';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit , OnDestroy{

  allBrands:IBrand[] = [];
  specificBrand!:IBrand;
  loadingScreen:boolean = false;
  getAllBrandsSubscribtion!:Subscription;
  getSpecificBrandSubscribtion!:Subscription;


  constructor(private _ProductService:ProductService){}
  
  ngOnInit(): void {
    // this._ProductService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.getAllBrandsSubscribtion = this._ProductService.getAllBrands().subscribe({
      next:(response)=>{console.log(response.data);
      this.allBrands = response.data;
      this.loadingScreen = false;
      // this._ProductService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      }
    })
  }

  handleGetSpecificBrand(brandId:string)
  {
    // this._ProductService.loadingScreen.next(true);
    this.loadingScreen = true;
    this.getSpecificBrandSubscribtion = this._ProductService.getSpecificBrand(brandId).subscribe({
      next:(response)=>{
        console.log(response);
        this.specificBrand = response.data;
        this.loadingScreen = false;
        // this._ProductService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
        this.loadingScreen = false;
      },
    })
  }

  ngOnDestroy(): void {
    // this.getAllBrandsSubscribtion.unsubscribe();
    // this.getSpecificBrandSubscribtion.unsubscribe();
  }

}
