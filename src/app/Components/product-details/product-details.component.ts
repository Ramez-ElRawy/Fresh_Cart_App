import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit , OnDestroy{

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
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
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  productId!:string|null;
  productDetails!:IProduct;
  wishedProductsList:string[] = [];
  loadingScreen:boolean = false;
  getLoggedUserWishlistSubscribtion!:Subscription;
  getProductByIdSubscribtion!:Subscription;
  addProductToCartSubscribtion!:Subscription;
  removeProductFromWishListSubscribtion!:Subscription;
  addProductToWishListSubscribtion!:Subscription;


  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService , private _CartService:CartService,private _WishListService:WishListService , private _ToastrService:ToastrService){}

  ngOnInit(): void {
    this.loadingScreen = true;
    // this._ProductService.loadingScreen.next(true);
    this._ActivatedRoute.paramMap.subscribe((params)=>{
    this.productId = params.get('id')
    });

    this.getLoggedUserWishlistSubscribtion = this._WishListService.getLoggedUserWishlist().subscribe({
      next:(response)=>{
        console.log(response);
        let wishedProduct = response.data;
        if(wishedProduct)
        {
          this.wishedProductsList = wishedProduct.map((product:any)=>{return product._id});
          console.log(this.wishedProductsList);
        }
      }
    })

    this._WishListService.productsWishList.subscribe({
      next:(response)=>{
        console.log(response);
        this.wishedProductsList = response;
      }
    })

    if(this.productId != null){
      this.getProductByIdSubscribtion = this._ProductService.getProductById(this.productId).subscribe({
        next:(response)=>{console.log(response.data);
          this.productDetails = response.data;
          this.loadingScreen = false;
          // this._ProductService.loadingScreen.next(false);
        },
        error:(err)=>{console.log(err)
          this.loadingScreen = false;
        },
      });
    }

  }

  handleAddProductToCart(id:any)
  {
    // this._ProductService.loadingScreen.next(true);
    this.addProductToCartSubscribtion = this._CartService.addProductToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success("Product Added Successfully To Cart 🛒",'Success');
        this._CartService.cartItemsNum.next(response.numOfCartItems)
        // this._ProductService.loadingScreen.next(false);
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  handleAddProductToWishList(id:string)
  {

    // this._WishListService.addProductToWishList(id).subscribe({
    //   next:(response)=>{
    //     console.log(response);
    //     this._ToastrService.success("Product Added Successfully To Wish List ❤️",'Success');
    //     this._WishListService.productsWishList.next(response.data);
    //   },
    //   error:(err)=>{console.log(err);
    //   }
    // })

    if (this.isWishedProduct(id)) {
      this.removeProductFromWishListSubscribtion = this._WishListService.removeProductFromWishList(id).subscribe({
        next:(response)=>{
          console.log(response);
          this._WishListService.productsWishList.next(response.data);
          this._WishListService.wishListItemsNum.next(response.data.length);
          this._ToastrService.error("Product Removed Successfully From Wish List ❤️",'Remove Product');
          this.wishedProductsList = response.data;
        }
      })
    }
    else{
      this.addProductToWishListSubscribtion = this._WishListService.addProductToWishList(id).subscribe({
        next:(response)=>{
          console.log(response);
          this._WishListService.productsWishList.next(response.data);
          this._WishListService.wishListItemsNum.next(response.data.length);
          this._ToastrService.success("Product Added Successfully To Wish List ❤️",'Success');
        },
        error:(err)=>{console.log(err);
        }
      })
    }

  }

  isWishedProduct(id:string):boolean
  {
    return this.wishedProductsList.includes(id) ? true : false;
  }

  ngOnDestroy(): void {
    // this.getLoggedUserWishlistSubscribtion.unsubscribe();
    // this.getProductByIdSubscribtion.unsubscribe();
    // this.addProductToCartSubscribtion.unsubscribe();
    // this.removeProductFromWishListSubscribtion.unsubscribe();
    // this.addProductToWishListSubscribtion.unsubscribe();
  }

}
