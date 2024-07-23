import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/Interfaces/icategory';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-home-categories-slider',
  templateUrl: './home-categories-slider.component.html',
  styleUrls: ['./home-categories-slider.component.css']
})
export class HomeCategoriesSliderComponent implements OnInit , OnDestroy{

  getAllCategoriesSubscribtion!:Subscription;
  
  constructor(private _ProductService:ProductService){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 7
      }
    },
    nav: false
  }

  allCategories:ICategory[] = [];
  ngOnInit(): void {
    this.getAllCategoriesSubscribtion = this._ProductService.getAllCategories().subscribe({
      next:(response)=>{this.allCategories = response.data;
      }
    })
  }

  ngOnDestroy(): void {
    // this.getAllCategoriesSubscribtion.unsubscribe();
  }

}
